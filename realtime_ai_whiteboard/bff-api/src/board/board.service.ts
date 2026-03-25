import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';

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

  async findByGuestToken(token: string) {
    const board = await this.prisma.board.findUnique({ where: { guestToken: token } });
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

  async generateShareLink(id: string, tenantId: string, permission: string) {
    await this.findOne(id, tenantId);
    const guestToken = randomBytes(32).toString('hex');
    const guestEditable = permission === 'edit';
    await this.prisma.board.update({
      where: { id },
      data: { guestToken, guestEditable },
    });
    return { guestToken, guestUrl: `/board/guest/${guestToken}` };
  }

  async revokeShareLink(id: string, tenantId: string) {
    await this.findOne(id, tenantId);
    await this.prisma.board.update({
      where: { id },
      data: { guestToken: null, guestEditable: false },
    });
  }
}
