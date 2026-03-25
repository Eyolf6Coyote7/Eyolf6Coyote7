import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('api/web/boards')
@UseGuards(AuthGuard('jwt'))
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateBoardDto) {
    return this.boardService.create(req.user.userId, req.user.tenantId, dto.title, dto.templateId);
  }

  @Get()
  findAll(
    @Request() req,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    return this.boardService.findAll(req.user.tenantId, req.user.userId, page, limit);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.boardService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() dto: UpdateBoardDto) {
    return this.boardService.update(id, req.user.tenantId, dto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.boardService.remove(id, req.user.tenantId);
  }
}
