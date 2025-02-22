// src/emr-model/emr-model.repository.ts
import { ObjectId, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrModel } from './entity/emr-model.entity';

@Injectable()
export class EmrModelRepository extends Repository<EmrModel> {
  // emr_model 정보 생성
  async createEmrModel(
    emrModel: EmrModel
  ): Promise<EmrModel> {
    return this.save(emrModel);
  }

  // 모든 emr_model 정보 조회
  async findAllModels(): Promise<EmrModel[]> {
    return this.find(); // 모든 emr_model 정보 반환
  }

  // 특정 emr_model 정보 조회 (ID로)
  async findModelById(objectId: ObjectId): Promise<EmrModel> {
    return this.findOne({ where: { objectId } }); // ID로 emr_model 정보 반환
  }

  // emr_model 정보 업데이트
  async updateEmrModel(
    objectId: ObjectId,
    updateData: Partial<EmrModel>,
  ): Promise<EmrModel> {
    await this.update(objectId, updateData); // emr_model 정보 업데이트
    return this.findOne({ where: { objectId } }); // 업데이트된 emr_model 정보 반환
  }

  // emr_model 정보 삭제
  async deleteEmrModel(id: string): Promise<void> {
    await this.delete(id); // emr_model 정보 삭제
  }

  // emr_user 식별값으로 emr_model 찾기
  async findModelsByEmrUserObj(emrUserObj: string): Promise<EmrModel[]> {
    return this.createQueryBuilder('emr_model')
    .where('emr_model.emrUserObj = :emrUserObj', { emrUserObj })
    .getMany();
  }

  // 변수명으로 emr_model 찾기
  async findModelsByKey(key: string): Promise<EmrModel[]> {
    return this.createQueryBuilder('emr_model')
    .where('emr_model.key = :key', { key })
    .getMany();
  }
}
