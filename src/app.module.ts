import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SlateDocModule } from './modules/slate-doc/slate-doc.module';

@Module({
  imports: [SlateDocModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }