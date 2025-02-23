import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmrApiLog } from './entity/emr-api-log.entity';
import { EmrApiLogRepository } from './emr-api-log.repository';
import { EmrApiLogService } from './emr-api-log.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmrApiLog, EmrApiLogRepository]),
  ],
  providers: [EmrApiLogRepository, EmrApiLogService],
  exports: [EmrApiLogRepository, EmrApiLogService]
})
export class EmrApiLogModule {}
