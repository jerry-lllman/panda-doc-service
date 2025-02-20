import { Test, TestingModule } from '@nestjs/testing';
import { SlateDocGateway } from './slate-doc.gateway';
import { SlateDocService } from './slate-doc.service';

describe('SlateDocGateway', () => {
  let gateway: SlateDocGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlateDocGateway, SlateDocService],
    }).compile();

    gateway = module.get<SlateDocGateway>(SlateDocGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
