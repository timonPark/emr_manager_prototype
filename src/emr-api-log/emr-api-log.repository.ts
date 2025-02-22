// src/emr-api-log/emr-api-log.repository.ts
import { ObjectId, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrApiLog } from './entity/emr-api-log.entity';

@Injectable()
export class EmrApiLogRepository extends Repository<EmrApiLog> {
  // emr_api_log 정보 생성
  async createEmrApiLog(
    emrApiLog: EmrApiLog
  ): Promise<EmrApiLog> {
    return this.save(emrApiLog);
  }

  // 모든 emr_api_log 정보 조회
  async findAllLogs(): Promise<EmrApiLog[]> {
    return this.find(); // 모든 emr_api_log 정보 반환
  }

  // 특정 emr_api_log 정보 조회 (ID로)
  async findLogById(objectId: ObjectId): Promise<EmrApiLog> {
    return this.findOne({ where: { objectId } }); // ID로 emr_api_log 정보 반환
  }

  // emr_api_log 정보 업데이트
  async updateEmrApiLog(
    objectId: ObjectId,
    updateData: Partial<EmrApiLog>,
  ): Promise<EmrApiLog> {
    await this.update(objectId, updateData); // emr_api_log 정보 업데이트
    return this.findOne({ where: { objectId } }); // 업데이트된 emr_api_log 정보 반환
  }

  // emr_api_log 정보 삭제
  async deleteEmrApiLog(id: string): Promise<void> {
    await this.delete(id); // emr_api_log 정보 삭제
  }

  // 특정 requestBody를 포함한 emr_api_log 조회
  async findLogsByRequestBody(requestBody: Record<string, any>): Promise<EmrApiLog[]> {
    return this.createQueryBuilder('emr_api_log')
    .where('emr_api_log.requestBody = :requestBody', { requestBody })
    .getMany();
  }
}
