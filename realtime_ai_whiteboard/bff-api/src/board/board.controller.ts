import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';

@Controller('api/web/boards')
@UseGuards(AuthGuard('jwt'))
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Post()
  create(@Request() req, @Body() body: { title: string; templateId?: string }) {
    return this.boardService.create(req.user.userId, req.user.tenantId, body.title, body.templateId);
  }

  @Get()
  findAll(@Request() req, @Query('page') page?: string, @Query('limit') limit?: string) {
    return this.boardService.findAll(req.user.tenantId, req.user.userId, +(page || 1), +(limit || 20));
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.boardService.findOne(id, req.user.tenantId);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() body: { title?: string; guestEditable?: boolean }) {
    return this.boardService.update(id, req.user.tenantId, body);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.boardService.remove(id, req.user.tenantId);
  }
}
