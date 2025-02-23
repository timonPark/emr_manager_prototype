import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmrUser } from './entity/emr-user.entity';
import { Repository } from 'typeorm';
import { EmrUserRepository } from './emr-user.repository';

@Injectable()
export class EmrUserService {
  constructor(
    private emrUserRepository:EmrUserRepository,
  ) {}

  public findOneByEmrUserInfo = async (emrUser: EmrUser): Promise<EmrUser> => {
    return await this.emrUserRepository.findOneByEmrUserInfo(emrUser);
  }

  public saveEmrUser = async (emrUser: EmrUser): Promise<EmrUser> => {
    return await this.emrUserRepository.createEmrUser(emrUser);
  }
}
