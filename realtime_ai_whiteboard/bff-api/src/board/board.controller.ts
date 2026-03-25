import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BoardService } from "./board.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { CurrentUser, AuthUser } from "../common/auth-user.decorator";

@Controller("api/web/boards")
@UseGuards(AuthGuard("jwt"))
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateBoardDto) {
    return this.boardService.create(
      user.userId,
      user.tenantId,
      dto.title,
      dto.templateId,
    );
  }

  @Get()
  findAll(
    @CurrentUser() user: AuthUser,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.boardService.findAll(user.tenantId, user.userId, page, limit);
  }

  @Get(":id")
  findOne(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.boardService.findOne(id, user.tenantId);
  }

  @Patch(":id")
  update(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, user.tenantId, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.boardService.remove(id, user.tenantId);
  }
}
