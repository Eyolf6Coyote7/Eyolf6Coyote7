import { IsOptional, IsString, IsBoolean } from "class-validator";

export class UpdateBoardDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  guestEditable?: boolean;
}
