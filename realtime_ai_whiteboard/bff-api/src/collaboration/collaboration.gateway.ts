import { Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { WebSocketServer } from 'ws';
import { setupWSConnection } from 'y-websocket/bin/utils';

export class CollaborationGateway implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CollaborationGateway.name);
  private wss: WebSocketServer | null = null;

  onModuleInit() {
    const port = parseInt(process.env.YJS_WS_PORT || '4002', 10);
    this.wss = new WebSocketServer({ port });

    this.wss.on('connection', (ws, req) => {
      const boardId = req.url?.slice(1) || 'default';
      this.logger.log(`Client connected to board: ${boardId}`);
      setupWSConnection(ws, req, { docName: boardId });
    });

    this.logger.log(`Yjs WebSocket server running on ws://localhost:${port}`);
  }

  onModuleDestroy() {
    this.wss?.close();
  }
}
