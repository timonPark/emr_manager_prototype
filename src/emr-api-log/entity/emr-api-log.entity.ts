// src/emr-api-log/emr-api-log.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../config/db/base.entity';

@Entity('emr_api_log') // MongoDB 컬렉션 이름: emr_api_log
export class EmrApiLog extends BaseEntity {
  @Column({ type: 'json' })
  requestBody: Record<string, any>; // request body로 들어온 원본 데이터 (JSON, 필수)
}
