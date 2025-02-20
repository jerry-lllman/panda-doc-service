import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
// @ts-expect-error @ts-ignore
import * as utils from 'y-websocket/bin/utils';
const { setupWSConnection } = utils
import * as qs from 'qs'
import { IncomingMessage } from 'http';

@WebSocketGateway(4000, {
  path: '/doc-room'
})
export class SlateDocGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log('Server initialized');
  }

  handleConnection(@ConnectedSocket() client: WebSocket, @MessageBody() request: IncomingMessage) {
    console.log('Client connected')
    // '/doc-room?docId=123'
    const { docId } = qs.parse(request.url.split('?')[1])

    setupWSConnection(client, request, { docName: docId })
  }

  handleDisconnect(@ConnectedSocket() client: WebSocket) {
    console.log('Client disconnected', client);
  }
}