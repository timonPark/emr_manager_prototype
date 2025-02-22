import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { EmrModule } from './emr/emr.module';
import { EmrUserModule } from './emr-user/emr-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mongoDBConfig } from './config/db/mongodb';

@Module({
  imports: [TypeOrmModule.forRoot(mongoDBConfig), RedisModule, EmrModule, EmrUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
