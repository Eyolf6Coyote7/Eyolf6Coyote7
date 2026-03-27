import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { BoardService } from './board.service';
import { PrismaService } from '../prisma/prisma.service';
import { SharePermission } from './dto/share-board.dto';

describe('BoardService', () => {
  let service: BoardService;
  let prisma: {
    board: {
      create: jest.Mock;
      findMany: jest.Mock;
      findFirst: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      board: {
        create: jest.fn(),
        findMany: jest.fn(),
        findFirst: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  describe('create', () => {
    it('should create a board', async () => {
      const board = { id: '1', title: 'Test' };
      prisma.board.create.mockResolvedValue(board);

      const result = await service.create('owner1', 'tenant1', 'Test');
      expect(prisma.board.create).toHaveBeenCalledWith({
        data: {
          ownerId: 'owner1',
          tenantId: 'tenant1',
          title: 'Test',
          templateId: undefined,
        },
      });
      expect(result).toEqual(board);
    });
  });

  describe('findAll', () => {
    it('should paginate results with safe defaults', async () => {
      prisma.board.findMany.mockResolvedValue([]);

      await service.findAll('t1', 'u1', 2, 10);
      expect(prisma.board.findMany).toHaveBeenCalledWith({
        where: { tenantId: 't1', ownerId: 'u1' },
        orderBy: { createdAt: 'desc' },
        skip: 10,
        take: 10,
      });
    });

    it('should clamp page to minimum 1', async () => {
      prisma.board.findMany.mockResolvedValue([]);
      await service.findAll('t1', 'u1', -1, 20);
      expect(prisma.board.findMany).toHaveBeenCalledWith(expect.objectContaining({ skip: 0 }));
    });

    it('should clamp limit to maximum 100', async () => {
      prisma.board.findMany.mockResolvedValue([]);
      await service.findAll('t1', 'u1', 1, 500);
      expect(prisma.board.findMany).toHaveBeenCalledWith(expect.objectContaining({ take: 100 }));
    });
  });

  describe('findOne', () => {
    it('should return board when found', async () => {
      const board = { id: '1', title: 'Test' };
      prisma.board.findFirst.mockResolvedValue(board);

      const result = await service.findOne('1', 't1');
      expect(result).toEqual(board);
    });

    it('should throw NotFoundException when not found', async () => {
      prisma.board.findFirst.mockResolvedValue(null);
      await expect(service.findOne('bad', 't1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete board after verifying it exists', async () => {
      prisma.board.findFirst.mockResolvedValue({ id: '1' });
      prisma.board.delete.mockResolvedValue({ id: '1' });

      await service.remove('1', 't1');
      expect(prisma.board.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('generateShareLink', () => {
    it('should generate a guest token and update the board', async () => {
      prisma.board.findFirst.mockResolvedValue({ id: '1' });
      prisma.board.update.mockResolvedValue({});

      const result = await service.generateShareLink('1', 't1', SharePermission.EDIT);

      expect(result.guestToken).toBeDefined();
      expect(result.guestToken).toHaveLength(64);
      expect(result.guestUrl).toContain('/board/guest/');
      expect(prisma.board.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ guestEditable: true }),
        }),
      );
    });

    it('should set guestEditable to false for VIEW permission', async () => {
      prisma.board.findFirst.mockResolvedValue({ id: '1' });
      prisma.board.update.mockResolvedValue({});

      await service.generateShareLink('1', 't1', SharePermission.VIEW);

      expect(prisma.board.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ guestEditable: false }),
        }),
      );
    });
  });

  describe('revokeShareLink', () => {
    it('should set guestToken to null', async () => {
      prisma.board.findFirst.mockResolvedValue({ id: '1' });
      prisma.board.update.mockResolvedValue({});

      await service.revokeShareLink('1', 't1');

      expect(prisma.board.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { guestToken: null, guestEditable: false },
      });
    });
  });
});
