import { Test, TestingModule } from '@nestjs/testing';
import { BoardController, GuestController } from './board.controller';
import { BoardService } from './board.service';
import { SharePermission } from './dto/share-board.dto';

describe('BoardController', () => {
  let controller: BoardController;
  let boardService: Record<string, jest.Mock>;
  const mockUser = { userId: 'u1', tenantId: 't1', role: 'owner' };

  beforeEach(async () => {
    boardService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      generateShareLink: jest.fn(),
      revokeShareLink: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardController],
      providers: [{ provide: BoardService, useValue: boardService }],
    }).compile();

    controller = module.get<BoardController>(BoardController);
  });

  it('create should pass user info and dto to service', async () => {
    boardService.create.mockResolvedValue({ id: '1' });
    await controller.create(mockUser, { title: 'Test' });
    expect(boardService.create).toHaveBeenCalledWith('u1', 't1', 'Test', undefined);
  });

  it('findAll should pass pagination params', async () => {
    boardService.findAll.mockResolvedValue([]);
    await controller.findAll(mockUser, 2, 10);
    expect(boardService.findAll).toHaveBeenCalledWith('t1', 'u1', 2, 10);
  });

  it('findOne should pass board id and tenant', async () => {
    boardService.findOne.mockResolvedValue({ id: '1' });
    await controller.findOne(mockUser, '1');
    expect(boardService.findOne).toHaveBeenCalledWith('1', 't1');
  });

  it('remove should call service remove', async () => {
    boardService.remove.mockResolvedValue({});
    await controller.remove(mockUser, '1');
    expect(boardService.remove).toHaveBeenCalledWith('1', 't1');
  });

  it('share should call generateShareLink with permission', async () => {
    boardService.generateShareLink.mockResolvedValue({ guestToken: 'abc' });
    await controller.share(mockUser, '1', {
      permission: SharePermission.EDIT,
    });
    expect(boardService.generateShareLink).toHaveBeenCalledWith('1', 't1', SharePermission.EDIT);
  });
});

describe('GuestController', () => {
  let controller: GuestController;
  let boardService: Record<string, jest.Mock>;

  beforeEach(async () => {
    boardService = { findByGuestToken: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestController],
      providers: [{ provide: BoardService, useValue: boardService }],
    }).compile();

    controller = module.get<GuestController>(GuestController);
  });

  it('should find board by guest token', async () => {
    boardService.findByGuestToken.mockResolvedValue({ id: '1' });
    const result = await controller.findByGuestToken('token123');
    expect(boardService.findByGuestToken).toHaveBeenCalledWith('token123');
    expect(result.id).toBe('1');
  });
});
