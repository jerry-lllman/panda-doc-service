import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentCollaborationModule } from './modules/document-collaboration/document-collaboration.module';

@Module({
  imports: [DocumentCollaborationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }