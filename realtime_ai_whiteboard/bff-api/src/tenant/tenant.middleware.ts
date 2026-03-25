import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const user = req.user as { tenantId?: string } | undefined;
    if (!user?.tenantId) {
      next();
      return;
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { id: user.tenantId },
    });

    if (!tenant) {
      throw new ForbiddenException('Invalid tenant');
    }

    // Set schema for this request
    await this.prisma.$executeRawUnsafe(`SET search_path TO "${tenant.schemaName}"`);
    next();
  }
}
