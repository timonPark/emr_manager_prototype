import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { redisConfig } from '../config/db/redis'; // Redis 설정 import

@Module({
  imports: [
    BullModule.forRoot({
      redis: redisConfig, // Redis 설정
    }),
    BullModule.registerQueue({
      name: 'emrQueue', // 큐 이름 설정
    }),
  ],
  exports: [BullModule],
})
export class RedisModule {}
