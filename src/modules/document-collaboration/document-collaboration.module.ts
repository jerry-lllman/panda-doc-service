import { Module } from '@nestjs/common';
import { DocumentCollaborationGateway } from './document-collaboration.gateway';

@Module({
  providers: [DocumentCollaborationGateway],
  // providers: [DocumentCollaborationGateway, DocumentCollaborationService],
})
export class DocumentCollaborationModule { } 