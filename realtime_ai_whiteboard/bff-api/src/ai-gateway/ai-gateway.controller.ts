import {
  Controller,
  Post,
  Body,
  Param,
  Sse,
  UseGuards,
  MessageEvent,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsNotEmpty, IsString } from 'class-validator';
import { Observable, interval, switchMap, takeWhile, map, from } from 'rxjs';
import { AiGatewayService } from './ai-gateway.service';
import { CurrentUser, AuthUser } from '../common/auth-user.decorator';

class PromptDto {
  @IsNotEmpty()
  @IsString()
  boardId: string;

  @IsNotEmpty()
  @IsString()
  prompt: string;
}

@Controller('ai')
export class AiGatewayController {
  private readonly logger = new Logger(AiGatewayController.name);

  constructor(private aiGateway: AiGatewayService) {}

  @Post('prompt')
  @UseGuards(AuthGuard('jwt'))
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
          try {
            const parsed = JSON.parse(result) as Record<string, unknown>;
            return { data: { type: 'done', ...parsed } } as MessageEvent;
          } catch {
            this.logger.error(`Failed to parse AI result for task ${taskId}`);
            return { data: { type: 'error', message: 'Invalid result format' } } as MessageEvent;
          }
        }
        return { data: { type: 'pending' } } as MessageEvent;
      }),
    );
  }
}
