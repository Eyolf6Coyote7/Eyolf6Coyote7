import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

const mockRedis = {
  xadd: jest.fn().mockResolvedValue('stream-id'),
  get: jest.fn(),
  quit: jest.fn(),
};

// Mock ESM modules before importing the service
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-1234'),
}));

jest.mock('ioredis', () => {
  const MockRedis = jest.fn(() => mockRedis);
  return { __esModule: true, default: MockRedis, Redis: MockRedis };
});

// Now import the service after the mock is set up
import { AiGatewayService } from './ai-gateway.service';

describe('AiGatewayService', () => {
  let service: AiGatewayService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiGatewayService,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('redis://localhost:6379') },
        },
      ],
    }).compile();

    service = module.get<AiGatewayService>(AiGatewayService);
  });

  describe('enqueueTask', () => {
    it('should add task to Redis stream and return taskId', async () => {
      const taskId = await service.enqueueTask('board-1', 'Summarize', 'u1');

      expect(taskId).toBeDefined();
      expect(typeof taskId).toBe('string');
      expect(mockRedis.xadd).toHaveBeenCalledWith(
        'ai-tasks',
        '*',
        'task_id',
        taskId,
        'board_id',
        'board-1',
        'prompt',
        'Summarize',
        'user_id',
        'u1',
      );
    });
  });

  describe('getResult', () => {
    it('should get result from Redis by taskId', async () => {
      mockRedis.get.mockResolvedValue('{"response":"done"}');

      const result = await service.getResult('task-123');
      expect(mockRedis.get).toHaveBeenCalledWith('ai-result:task-123');
      expect(result).toBe('{"response":"done"}');
    });

    it('should return null when no result exists', async () => {
      mockRedis.get.mockResolvedValue(null);

      const result = await service.getResult('pending-task');
      expect(result).toBeNull();
    });
  });

  describe('onModuleDestroy', () => {
    it('should quit Redis connection', async () => {
      await service.onModuleDestroy();
      expect(mockRedis.quit).toHaveBeenCalled();
    });
  });
});
