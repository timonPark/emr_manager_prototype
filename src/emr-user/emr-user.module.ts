import { Module } from '@nestjs/common';
import { EmrUserService } from './emr-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmrUser } from './entity/emr-user.entity';
import { EmrUserRepository } from './emr-user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmrUser, EmrUserRepository]),
  ],
  providers: [EmrUserService, EmrUserRepository],
  exports: [EmrUserService, EmrUserRepository]
})
export class EmrUserModule {}
