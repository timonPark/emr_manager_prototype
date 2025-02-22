import { Test, TestingModule } from '@nestjs/testing';
import { EmrUserService } from './emr-user.service';

describe('EmrUserService', () => {
  let service: EmrUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmrUserService],
    }).compile();

    service = module.get<EmrUserService>(EmrUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
