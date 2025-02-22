// src/emr-user/emr-user.repository.ts
import { ObjectId, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrUser } from './entity/emr-user.entity';

@Injectable()
export class EmrUserRepository extends Repository<EmrUser> {
  // 환자 정보 생성
  async createEmrUser(
    emrUser: EmrUser
  ): Promise<EmrUser> {
    return this.save(emrUser);
  }

  // 모든 환자 정보 조회
  async findAllUsers(): Promise<EmrUser[]> {
    return this.find(); // 모든 환자 정보 반환
  }

  // 특정 환자 정보 조회 (ID로)
  async findUserById(objectId: ObjectId): Promise<EmrUser> {
    return this.findOne({ where: { objectId}}); // ID로 환자 정보 반환
  }

  // 환자 정보 업데이트
  async updateEmrUser(
    objectId: ObjectId,
    updateData: Partial<EmrUser>,
  ): Promise<EmrUser> {
    await this.update(objectId, updateData); // 환자 정보 업데이트
    return this.findOne({ where: {objectId} }); // 업데이트된 환자 정보 반환
  }

  // 환자 정보 삭제
  async deleteEmrUser(id: string): Promise<void> {
    await this.delete(id); // 환자 정보 삭제
  }

  // 이름으로 환자 찾기
  async findUsersByName(name: string): Promise<EmrUser[]> {
    return this.createQueryBuilder('emr_user')
    .where('emr_user.name = :name', { name })
    .getMany();
  }

  // 회사 코드로 환자 찾기
  async findUsersByComCode(emrComCode: string): Promise<EmrUser[]> {
    return this.createQueryBuilder('emr_user')
    .where('emr_user.emrComCode = :emrComCode', { emrComCode })
    .getMany();
  }
}
