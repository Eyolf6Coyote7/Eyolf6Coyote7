import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NextFunction, Request, Response } from 'express';

const SCHEMA_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

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

    if (!SCHEMA_NAME_PATTERN.test(tenant.schemaName)) {
      throw new ForbiddenException('Invalid tenant schema');
    }

    await this.prisma.$executeRawUnsafe(`SET search_path TO "${tenant.schemaName}"`);
    next();
  }
}
