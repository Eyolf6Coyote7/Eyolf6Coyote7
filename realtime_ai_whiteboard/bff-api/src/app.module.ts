import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { CollaborationModule } from './collaboration/collaboration.module';
import { AiGatewayModule } from './ai-gateway/ai-gateway.module';
import { TenantModule } from './tenant/tenant.module';
import { ExportModule } from './export/export.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    BoardModule,
    CollaborationModule,
    AiGatewayModule,
    TenantModule,
    ExportModule,
  ],
})
export class AppModule {}
