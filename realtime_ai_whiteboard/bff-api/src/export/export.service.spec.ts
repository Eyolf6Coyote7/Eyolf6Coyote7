import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ExportService } from './export.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ExportService', () => {
  let service: ExportService;
  let prisma: { board: { findFirst: jest.Mock } };

  beforeEach(async () => {
    prisma = { board: { findFirst: jest.fn() } };

    const module: TestingModule = await Test.createTestingModule({
      providers: [ExportService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<ExportService>(ExportService);
  });

  it('should return download URL for existing board', async () => {
    prisma.board.findFirst.mockResolvedValue({ id: 'b1', title: 'Test' });

    const url = await service.exportBoard('b1', 'png', 't1');
    expect(url).toContain('b1.png');
    expect(url).toContain('minio');
  });

  it('should throw NotFoundException for missing board', async () => {
    prisma.board.findFirst.mockResolvedValue(null);

    await expect(service.exportBoard('bad', 'png', 't1')).rejects.toThrow(NotFoundException);
  });

  it('should include the correct format in URL', async () => {
    prisma.board.findFirst.mockResolvedValue({ id: 'b1' });

    const url = await service.exportBoard('b1', 'pdf', 't1');
    expect(url).toContain('b1.pdf');
  });
});
