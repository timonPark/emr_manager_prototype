import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmrUser } from './entity/emr-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmrUserService {
  constructor(
    @InjectRepository(EmrUser)
    private emrUserRepository: Repository<EmrUser>,
  ) {}

  public findOneByEmrUserInfo = async (emrUser: EmrUser) => {
    return await this.emrUserRepository.findOne({
      where: {
        name: emrUser.name,
        birthday: emrUser.birthday,
        gender: emrUser.gender,
        phone: emrUser.phone,
        ykiho: emrUser.ykiho,
        emrComCode: emrUser.emrComCode,
      },
      order: {
        createdTs: 'DESC'
      }
    })
  }
}
