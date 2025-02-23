import { Test, TestingModule } from '@nestjs/testing';
import { EmrApiLogService } from './emr-api-log.service';

describe('EmrApiLogService', () => {
  let service: EmrApiLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmrApiLogService],
    }).compile();

    service = module.get<EmrApiLogService>(EmrApiLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
