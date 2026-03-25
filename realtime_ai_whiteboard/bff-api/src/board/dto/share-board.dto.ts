import { IsEnum } from 'class-validator';

export enum SharePermission {
  VIEW = 'view',
  EDIT = 'edit',
}

export class ShareBoardDto {
  @IsEnum(SharePermission)
  permission: SharePermission;
}
