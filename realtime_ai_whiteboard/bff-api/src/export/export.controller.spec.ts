import { Test, TestingModule } from '@nestjs/testing';
import { ExportController } from './export.controller';
import { ExportService } from './export.service';

describe('ExportController', () => {
  let controller: ExportController;
  let exportService: { exportBoard: jest.Mock };

  beforeEach(async () => {
    exportService = { exportBoard: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExportController],
      providers: [{ provide: ExportService, useValue: exportService }],
    }).compile();

    controller = module.get<ExportController>(ExportController);
  });

  it('should return download URL', async () => {
    exportService.exportBoard.mockResolvedValue('https://minio/export.png');

    const result = await controller.exportBoard(
      { userId: 'u1', tenantId: 't1', role: 'owner' },
      'board-1',
      { format: 'png' },
    );

    expect(result).toEqual({ downloadUrl: 'https://minio/export.png' });
    expect(exportService.exportBoard).toHaveBeenCalledWith('board-1', 'png', 't1');
  });
});
