import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExportService } from './export.service';
import { ExportDto } from './dto/export.dto';
import { CurrentUser, AuthUser } from '../common/auth-user.decorator';

@Controller('api/web/boards')
@UseGuards(AuthGuard('jwt'))
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Post(':id/export')
  async exportBoard(
    @CurrentUser() user: AuthUser,
    @Param('id') boardId: string,
    @Body() dto: ExportDto,
  ) {
    const url = await this.exportService.exportBoard(boardId, dto.format, user.tenantId);
    return { downloadUrl: url };
  }
}
