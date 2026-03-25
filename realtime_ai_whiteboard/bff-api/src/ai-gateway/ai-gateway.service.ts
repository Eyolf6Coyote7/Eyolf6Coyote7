import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AiGatewayService {
  private readonly logger = new Logger(AiGatewayService.name);
  private readonly redis: Redis;

  constructor(private config: ConfigService) {
    this.redis = new Redis(this.config.get('REDIS_URL', 'redis://localhost:6379'));
  }

  async enqueueTask(boardId: string, prompt: string, userId: string): Promise<string> {
    const taskId = uuid();
    await this.redis.xadd(
      'ai-tasks',
      '*',
      'task_id',
      taskId,
      'board_id',
      boardId,
      'prompt',
      prompt,
      'user_id',
      userId,
    );
    this.logger.log(`Enqueued AI task ${taskId} for board ${boardId}`);
    return taskId;
  }

  async getResult(taskId: string): Promise<string | null> {
    return this.redis.get(`ai-result:${taskId}`);
  }
}
