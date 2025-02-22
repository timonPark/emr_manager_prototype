// src/emr-group-snapshot/emr-group-snapshot.repository.ts
import { ObjectId, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmrGroupSnapshot } from './entity/emr-group-snapshot.entity';

@Injectable()
export class EmrGroupSnapshotRepository extends Repository<EmrGroupSnapshot> {
  // emr_group_snapshot 정보 생성
  async createEmrGroupSnapshot(
    emrGroupSnapshot: EmrGroupSnapshot
  ): Promise<EmrGroupSnapshot> {
    return this.save(emrGroupSnapshot);
  }

  // 모든 emr_group_snapshot 정보 조회
  async findAllSnapshots(): Promise<EmrGroupSnapshot[]> {
    return this.find(); // 모든 emr_group_snapshot 정보 반환
  }

  // 특정 emr_group_snapshot 정보 조회 (ID로)
  async findSnapshotById(objectId: ObjectId): Promise<EmrGroupSnapshot> {
    return this.findOne({ where: { objectId } }); // ID로 emr_group_snapshot 정보 반환
  }

  // emr_group_snapshot 정보 업데이트
  async updateEmrGroupSnapshot(
    objectId: ObjectId,
    updateData: Partial<EmrGroupSnapshot>,
  ): Promise<EmrGroupSnapshot> {
    await this.update(objectId, updateData); // emr_group_snapshot 정보 업데이트
    return this.findOne({ where: { objectId } }); // 업데이트된 emr_group_snapshot 정보 반환
  }

  // emr_group_snapshot 정보 삭제
  async deleteEmrGroupSnapshot(id: string): Promise<void> {
    await this.delete(id); // emr_group_snapshot 정보 삭제
  }

  // emr_user 식별값으로 emr_group_snapshot 찾기
  async findSnapshotsByEmrUserObj(emrUserObj: string): Promise<EmrGroupSnapshot[]> {
    return this.createQueryBuilder('emr_group_snapshot')
    .where('emr_group_snapshot.emrUserObj = :emrUserObj', { emrUserObj })
    .getMany();
  }

  // 특정 스냅샷 기록일자 범위로 조회
  async findSnapshotsByDateRange(startTs: number, endTs: number): Promise<EmrGroupSnapshot[]> {
    return this.createQueryBuilder('emr_group_snapshot')
    .where('emr_group_snapshot.snapshotTs BETWEEN :startTs AND :endTs', { startTs, endTs })
    .getMany();
  }
}
