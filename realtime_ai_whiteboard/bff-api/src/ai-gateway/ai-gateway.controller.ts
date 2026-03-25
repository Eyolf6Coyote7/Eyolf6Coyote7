import { Controller, Post, Body, Param, Sse, UseGuards, MessageEvent } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, interval, switchMap, takeWhile, map, from } from 'rxjs';
import { AiGatewayService } from './ai-gateway.service';
import { CurrentUser, AuthUser } from '../common/auth-user.decorator';

class PromptDto {
  boardId: string;
  prompt: string;
}

@Controller('api/web/ai')
@UseGuards(AuthGuard('jwt'))
export class AiGatewayController {
  constructor(private aiGateway: AiGatewayService) {}

  @Post('prompt')
  async submitPrompt(@CurrentUser() user: AuthUser, @Body() dto: PromptDto) {
    const taskId = await this.aiGateway.enqueueTask(dto.boardId, dto.prompt, user.userId);
    return { taskId };
  }

  @Sse('stream/:taskId')
  streamResult(@Param('taskId') taskId: string): Observable<MessageEvent> {
    return interval(500).pipe(
      switchMap(() => from(this.aiGateway.getResult(taskId))),
      takeWhile((result) => !result, true),
      map((result) => {
        if (result) {
          const parsed = JSON.parse(result);
          return { data: { type: 'done', ...parsed } } as MessageEvent;
        }
        return { data: { type: 'pending' } } as MessageEvent;
      }),
    );
  }
}
