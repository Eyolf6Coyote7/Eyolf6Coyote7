import { IsEnum } from 'class-validator';

enum SharePermission {
  VIEW = 'view',
  EDIT = 'edit',
}

export class ShareBoardDto {
  @IsEnum(SharePermission)
  permission: SharePermission;
}
