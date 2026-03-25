import { IsEnum } from 'class-validator';

export enum ExportFormat {
  PNG = 'png',
  PDF = 'pdf',
}

export class ExportDto {
  @IsEnum(ExportFormat)
  format: ExportFormat;
}
