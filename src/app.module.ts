import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { EmrModule } from './emr/emr.module';
import { EmrUserModule } from './emr-user/emr-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoDBConfig } from './config/db/mongodb';
import { HealthModule } from './health/health.module';

@Module({
  imports: [TypeOrmModule.forRoot(mongoDBConfig), RedisModule, EmrModule, EmrUserModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
