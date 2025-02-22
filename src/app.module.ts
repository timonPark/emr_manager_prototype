import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { EmrModule } from './emr/emr.module';
import { EmrUserModule } from './emr-user/emr-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoDBConfig } from './config/db/mongodb';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmrApiLogModule } from './emr-api-log/emr-api-log.module';
import { EmrGroupSnapshotModule } from './emr-group-snapshot/emr-group-snapshot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 애플리케이션 전체에서 환경 변수를 사용할 수 있도록 설정
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: mongoDBConfig,
      inject: [ConfigService],
    }),
    RedisModule, EmrModule, EmrUserModule, HealthModule, EmrApiLogModule, EmrGroupSnapshotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
