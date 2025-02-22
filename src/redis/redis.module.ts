import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { redisConfig } from '../config/db/redis';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Redis 설정 import

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],  // ConfigModule을 가져와서 환경 변수 사용
      useFactory: (configService: ConfigService) => ({
        redis: redisConfig(configService),  // ConfigService를 통해 Redis 설정
      }),
      inject: [ConfigService],  // ConfigService 주입
    }),
    BullModule.registerQueue({
      name: 'emrQueue', // 큐 이름 설정
    }),
  ],
  exports: [BullModule],
})
export class RedisModule {}
