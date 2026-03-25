import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ExportService } from './export.service';

enum ExportFormat {
  PNG = 'png',
  PDF = 'pdf',
}

class ExportDto {
  @IsNotEmpty()
  boardId: string;

  @IsEnum(ExportFormat)
  format: ExportFormat;
}

@Controller('api/web/boards')
@UseGuards(AuthGuard('jwt'))
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Post('export')
  exportBoard(@Body() dto: ExportDto) {
    const url = this.exportService.exportBoard(dto.boardId, dto.format);
    return { downloadUrl: url };
  }
}
