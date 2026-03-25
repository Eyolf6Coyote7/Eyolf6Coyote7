import { Logger, OnModuleInit, OnModuleDestroy, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';
import { verify } from 'jsonwebtoken';
import type { IncomingMessage } from 'http';

@Injectable()
export class CollaborationGateway implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CollaborationGateway.name);
  private wss: WebSocketServer | null = null;

  constructor(private config: ConfigService) {}

  onModuleInit() {
    const port = parseInt(this.config.get('YJS_WS_PORT', '4002'), 10);
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws, req) => {
      const token = this.extractToken(req);
      if (!token || !this.validateToken(token)) {
        this.logger.warn('Unauthorized WS connection attempt');
        ws.close(4001, 'Unauthorized');
        return;
      }

      const boardId = req.url?.slice(1) || 'default';
      this.logger.log(`Client connected to board: ${boardId}`);
      setupWSConnection(ws, req, { docName: boardId });
    });

    this.logger.log(`Yjs WebSocket server running on ws://localhost:${port}`);
  }

  onModuleDestroy() {
    this.wss?.close();
  }

  private extractToken(req: IncomingMessage): string | null {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    return url.searchParams.get('token');
  }

  private validateToken(token: string): boolean {
    try {
      const secret = this.config.getOrThrow<string>('JWT_SECRET');
      verify(token, secret);
      return true;
    } catch {
      return false;
    }
  }
}
