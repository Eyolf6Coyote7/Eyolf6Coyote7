import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExportService {
  private readonly logger = new Logger(ExportService.name);

  constructor(private prisma: PrismaService) {}

  async exportBoard(boardId: string, format: string, tenantId: string): Promise<string> {
    const board = await this.prisma.board.findFirst({ where: { id: boardId, tenantId } });
    if (!board) throw new NotFoundException('Board not found');

    this.logger.log(`Exporting board ${boardId} as ${format}`);
    return `https://minio.localhost/exports/${boardId}.${format}`;
  }
}
