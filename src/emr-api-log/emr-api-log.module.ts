import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmrApiLog } from './entity/emr-api-log.entity';
import { EmrApiLogRepository } from './emr-api-log.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmrApiLog, EmrApiLogRepository]),
  ],
  providers: [EmrApiLogRepository],
  exports: [EmrApiLogRepository]
})
export class EmrApiLogModule {}
