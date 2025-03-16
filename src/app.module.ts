import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './config/api/response-format.interceptor';
import { WinstonLoggerService } from './config/logger/winston-logger.service';
import { RequestIdMiddleware } from './config/middlewares/request-id.middleware';
import { RequestLoggerInterceptor } from './config/interceptors/request-logger.interceptor';
import { ResponseLoggerInterceptor } from './config/interceptors/response-logger.interceptor';
import { RequestIdService } from './config/middlewares/request-id.service';

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
  providers: [
    AppService,
    RequestIdService,
    WinstonLoggerService,
    {
      provide: APP_INTERCEPTOR,
      useClass: WinstonLoggerService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseFormatInterceptor,
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware)
    .forRoutes('*')
  }
}
