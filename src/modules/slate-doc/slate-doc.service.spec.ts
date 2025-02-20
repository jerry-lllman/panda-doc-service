import { Test, TestingModule } from '@nestjs/testing';
import { SlateDocService } from './slate-doc.service';

describe('SlateDocService', () => {
  let service: SlateDocService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlateDocService],
    }).compile();

    service = module.get<SlateDocService>(SlateDocService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
