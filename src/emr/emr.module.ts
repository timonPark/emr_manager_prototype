import { Module } from '@nestjs/common';
import { EmrService } from './emr.service';
import { EmrController } from './emr.controller';
import { RedisModule } from '../redis/redis.module';
import { EmrProcessor } from './emr.processor';
import { EmrUserModule } from '../emr-user/emr-user.module';

@Module({
  imports: [
    RedisModule,  // RedisModule 임포트 (큐가 RedisModule에서 이미 등록되었으므로)
    EmrUserModule,
  ],
  providers: [EmrService, EmrProcessor],
  controllers: [EmrController]
})
export class EmrModule {}
