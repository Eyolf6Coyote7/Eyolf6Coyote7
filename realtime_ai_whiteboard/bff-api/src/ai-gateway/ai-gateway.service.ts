import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { v4 as uuid } from 'uuid';

const STREAM_KEY = 'ai-tasks';
const RESULT_PREFIX = 'ai-result:';

@Injectable()
export class AiGatewayService implements OnModuleDestroy {
  private readonly logger = new Logger(AiGatewayService.name);
  private readonly redis: Redis;

  constructor(private config: ConfigService) {
    this.redis = new Redis(this.config.get('REDIS_URL', 'redis://localhost:6379'));
  }

  async onModuleDestroy() {
    await this.redis.quit();
  }

  async enqueueTask(boardId: string, prompt: string, userId: string): Promise<string> {
    const taskId = uuid();
    await this.redis.xadd(
      STREAM_KEY,
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
    return this.redis.get(`${RESULT_PREFIX}${taskId}`);
  }
}
