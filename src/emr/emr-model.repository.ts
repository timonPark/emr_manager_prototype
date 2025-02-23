// src/emr-model/emr-model.repository.ts
import { MongoRepository, ObjectId } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrModel } from './entity/emr-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmrApiLog } from '../emr-api-log/entity/emr-api-log.entity';

@Injectable()
export class EmrModelRepository {

  constructor(
    @InjectRepository(EmrModel)
    private readonly emrModelRepository: MongoRepository<EmrModel>
  ) {}
  // emr_model 정보 생성
  async createEmrModel(
    emrModel: EmrModel
  ): Promise<EmrModel> {
    return await this.emrModelRepository.save(emrModel);
  }

  // 모든 emr_model 정보 조회
  async findAllModels(): Promise<EmrModel[]> {
    return await this.emrModelRepository.find(); // 모든 emr_model 정보 반환
  }

  // 특정 emr_model 정보 조회 (ID로)
  async findModelById(objectId: ObjectId): Promise<EmrModel> {
    return await this.emrModelRepository.findOne({ where: { objectId } }); // ID로 emr_model 정보 반환
  }

  // emr_model 정보 업데이트
  async updateEmrModel(
    objectId: ObjectId,
    updateData: Partial<EmrModel>,
  ): Promise<EmrModel> {
    await this.emrModelRepository.update(objectId, updateData); // emr_model 정보 업데이트
    return await this.emrModelRepository.findOne({ where: { objectId } }); // 업데이트된 emr_model 정보 반환
  }

  // emr_user 식별값으로 emr_model 찾기
  async findModelsByEmrUserObj(emrUserObj: ObjectId): Promise<EmrModel[]> {
    return await this.emrModelRepository.createQueryBuilder('emr_model')
    .where('emr_model.emrUserObj = :emrUserObj', { emrUserObj })
    .getMany();
  }

  // 변수명으로 emr_model 찾기
  async findModelsByKey(key: string): Promise<EmrModel[]> {
    return await this.emrModelRepository.createQueryBuilder('emr_model')
    .where('emr_model.key = :key', { key })
    .getMany();
  }

  public findModelsByEmrUserObjAndKey = async (emrUserObj: ObjectId, key: string): Promise<EmrModel> => {
    // return await this.emrModelRepository.createQueryBuilder('emr_model')
    // .where('emr_model.emrUserObj = :emrUserObj', { emrUserObj })
    // .where('emr_model.key = :key', { key })
    // .getOne();
    return this.emrModelRepository.findOne({
      where: {
        emrUserObj,
        key
      }
    })
  }
}
