import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController, GuestController } from './board.controller';

@Module({
  controllers: [BoardController, GuestController],
  providers: [BoardService],
})
export class BoardModule {}
