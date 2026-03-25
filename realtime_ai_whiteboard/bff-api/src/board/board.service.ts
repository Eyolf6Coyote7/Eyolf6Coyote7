import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  create(ownerId: string, tenantId: string, title: string, templateId?: string) {
    return this.prisma.board.create({ data: { ownerId, tenantId, title, templateId } });
  }

  findAll(tenantId: string, ownerId: string, page = 1, limit = 20) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(100, Math.max(1, limit));
    return this.prisma.board.findMany({
      where: { tenantId, ownerId },
      orderBy: { createdAt: 'desc' },
      skip: (safePage - 1) * safeLimit,
      take: safeLimit,
    });
  }

  async findOne(id: string, tenantId: string) {
    const board = await this.prisma.board.findFirst({ where: { id, tenantId } });
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, tenantId: string, data: { title?: string; guestEditable?: boolean }) {
    await this.findOne(id, tenantId);
    return this.prisma.board.update({ where: { id }, data });
  }

  async remove(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    return this.prisma.board.delete({ where: { id } });
  }
}
