// src/emr-group-snapshot/emr-group-snapshot.repository.ts
import { MongoRepository, ObjectId } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrGroupSnapshot } from './entity/emr-group-snapshot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmrApiLog } from '../emr-api-log/entity/emr-api-log.entity';

@Injectable()
export class EmrGroupSnapshotRepository{
  constructor(
    @InjectRepository(EmrGroupSnapshot)
    private readonly emrGroupSnapshotRepository: MongoRepository<EmrGroupSnapshot>
  ) {}

  // emr_group_snapshot 정보 생성
  async createEmrGroupSnapshot(
    emrGroupSnapshot: EmrGroupSnapshot
  ): Promise<EmrGroupSnapshot> {
    return await this.emrGroupSnapshotRepository.save(emrGroupSnapshot);
  }

  // 모든 emr_group_snapshot 정보 조회
  async findAllSnapshots(): Promise<EmrGroupSnapshot[]> {
    return await this.emrGroupSnapshotRepository.find(); // 모든 emr_group_snapshot 정보 반환
  }

  // 특정 emr_group_snapshot 정보 조회 (ID로)
  async findSnapshotById(objectId: ObjectId): Promise<EmrGroupSnapshot> {
    return await this.emrGroupSnapshotRepository.findOne({ where: { objectId } }); // ID로 emr_group_snapshot 정보 반환
  }

  // emr_group_snapshot 정보 업데이트
  async updateEmrGroupSnapshot(
    objectId: ObjectId,
    updateData: Partial<EmrGroupSnapshot>,
  ): Promise<EmrGroupSnapshot> {
    await this.emrGroupSnapshotRepository.update(objectId, updateData); // emr_group_snapshot 정보 업데이트
    return await this.emrGroupSnapshotRepository.findOne({ where: { objectId } }); // 업데이트된 emr_group_snapshot 정보 반환
  }

  // emr_group_snapshot 정보 삭제
  async deleteEmrGroupSnapshot(id: string): Promise<void> {
    await this.emrGroupSnapshotRepository.delete(id); // emr_group_snapshot 정보 삭제
  }

  // emr_user 식별값으로 emr_group_snapshot 찾기
  async findSnapshotsByEmrUserObj(emrUserObj: string): Promise<EmrGroupSnapshot[]> {
    return await this.emrGroupSnapshotRepository.createQueryBuilder('emr_group_snapshot')
    .where('emr_group_snapshot.emrUserObj = :emrUserObj', { emrUserObj })
    .getMany();
  }

  // 특정 스냅샷 기록일자 범위로 조회
  async findSnapshotsByDateRange(startTs: number, endTs: number): Promise<EmrGroupSnapshot[]> {
    return await this.emrGroupSnapshotRepository.createQueryBuilder('emr_group_snapshot')
    .where('emr_group_snapshot.snapshotTs BETWEEN :startTs AND :endTs', { startTs, endTs })
    .getMany();
  }
}
