import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExportService {
  private readonly logger = new Logger(ExportService.name);

  exportBoard(boardId: string, format: 'png' | 'pdf'): string {
    this.logger.log(`Exporting board ${boardId} as ${format}`);
    // TODO: implement actual canvas → PNG/PDF rendering
    return `https://minio.localhost/exports/${boardId}.${format}`;
  }
}
