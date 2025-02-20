import { Module } from '@nestjs/common';
import { SlateDocService } from './slate-doc.service';
import { SlateDocGateway } from './slate-doc.gateway';

@Module({
  providers: [SlateDocGateway],
  // providers: [SlateDocGateway, SlateDocService],
})
export class SlateDocModule { }
