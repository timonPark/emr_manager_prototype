// src/emr-group-snapshot/emr-group-snapshot.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../config/db/base.entity';

@Entity('emr_group_snapshot') // MongoDB 컬렉션 이름: emr_group_snapshot
export class EmrGroupSnapshot extends BaseEntity {
  @Column({ type: 'string' })
  emrUserObj: string; // emr_user의 식별값 (문자열, 필수)

  @Column({ type: 'json' })
  emrSnapshot: Record<string, any>; // emr 스냅샷으로 기록된 데이터 (JSON, 필수)

  @Column({ type: 'bigint' })
  snapshotTs: number; // 스냅샷 기록일자 (Unix 타임스탬프, 필수)
}
