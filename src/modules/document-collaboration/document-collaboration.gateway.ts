import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import * as utils from 'y-websocket/bin/utils';
const { setupWSConnection } = utils
import qs from 'qs'
import { IncomingMessage } from 'http';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  path: '/doc-room',
  transports: ['websocket'],
  cors: {
    origin: '*',
    credentials: true
  }
})
export class DocumentCollaborationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  logger = new Logger('DocumentCollaborationGateway')

  afterInit() {
    this.logger.debug('WebSocket Server initialized, path: /doc-room');
  }

  handleConnection(@ConnectedSocket() client: WebSocket, @MessageBody() request: IncomingMessage) {
    this.logger.debug('Client connected');

    try {
      // '/doc-room?docId=123'
      const url = request.url || '';
      const queryString = url.split('?')[1];

      if (!queryString) {
        this.logger.warn('No query string found in WebSocket connection URL');
        client.close(1008, 'Missing docId parameter');
        return;
      }

      const { docId } = qs.parse(queryString);

      if (!docId) {
        this.logger.warn('No docId found in query parameters');
        client.close(1008, 'Missing docId parameter');
        return;
      }

      this.logger.debug(`Setting up WebSocket connection for docId: ${docId}`);
      setupWSConnection(client, request, { docName: docId })
    } catch (error) {
      this.logger.error('Error handling WebSocket connection:', error);
      client.close(1011, 'Internal server error');
    }
  }

  handleDisconnect(@ConnectedSocket() client: WebSocket) {
    this.logger.debug('Client disconnected');

    client.close(1000, 'Client disconnected');
  }
} 