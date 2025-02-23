// src/emr-user/emr-user.repository.ts
import { MongoRepository, ObjectId } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrUser } from './entity/emr-user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmrApiLog } from '../emr-api-log/entity/emr-api-log.entity';

@Injectable()
export class EmrUserRepository {
  constructor(
    @InjectRepository(EmrUser)
    private readonly emrUserRepository: MongoRepository<EmrUser>
  ) {}

  // 환자 정보 생성
  async createEmrUser(
    emrUser: EmrUser
  ): Promise<EmrUser> {
    return await this.emrUserRepository.save(emrUser);
  }

  // 모든 환자 정보 조회
  async findAllUsers(): Promise<EmrUser[]> {
    return await this.emrUserRepository.find(); // 모든 환자 정보 반환
  }

  // 특정 환자 정보 조회 (ID로)
  async findUserById(objectId: ObjectId): Promise<EmrUser> {
    return await this.emrUserRepository.findOne({ where: { objectId } }); // ID로 환자 정보 반환
  }

  // 환자 정보 업데이트
  async updateEmrUser(
    objectId: ObjectId,
    updateData: Partial<EmrUser>,
  ): Promise<EmrUser> {
    await this.emrUserRepository.update(objectId, updateData); // 환자 정보 업데이트
    return await this.emrUserRepository.findOne({ where: { objectId } }); // 업데이트된 환자 정보 반환
  }

  // 환자 정보 삭제
  async deleteEmrUser(id: string): Promise<void> {
    await this.emrUserRepository.delete(id); // 환자 정보 삭제
  }

  // 이름으로 환자 찾기
  async findUsersByName(name: string): Promise<EmrUser[]> {
    return await this.emrUserRepository.createQueryBuilder('emr_user')
    .where('emr_user.name = :name', { name })
    .getMany();
  }

  // 회사 코드로 환자 찾기
  async findUsersByComCode(emrComCode: string): Promise<EmrUser[]> {
    return await this.emrUserRepository.createQueryBuilder('emr_user')
    .where('emr_user.emrComCode = :emrComCode', { emrComCode })
    .getMany();
  }

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
