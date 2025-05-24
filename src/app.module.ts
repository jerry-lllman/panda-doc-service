import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentCollaborationModule } from './modules/document-collaboration/document-collaboration.module';
import { DocumentModule } from './modules/document/document.module';

@Module({
  imports: [DocumentCollaborationModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }