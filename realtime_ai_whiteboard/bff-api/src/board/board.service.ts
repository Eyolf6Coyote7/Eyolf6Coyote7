import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, tenantId: string, title: string, templateId?: string) {
    return this.prisma.board.create({
      data: { ownerId, tenantId, title, templateId },
    });
  }

  async findAll(tenantId: string, ownerId: string, page = 1, limit = 20) {
    return this.prisma.board.findMany({
      where: { tenantId, ownerId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.board.findFirst({
      where: { id, tenantId },
    });
  }

  async update(id: string, tenantId: string, data: { title?: string; guestEditable?: boolean }) {
    return this.prisma.board.updateMany({
      where: { id, tenantId },
      data,
    });
  }

  async remove(id: string, tenantId: string) {
    return this.prisma.board.deleteMany({
      where: { id, tenantId },
    });
  }
}
