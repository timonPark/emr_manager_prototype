// src/emr-model/emr-model.entity.ts
import { Entity, Column, ObjectId } from 'typeorm';
import { BaseEntity } from '../../config/db/base.entity';

@Entity('emr_model') // MongoDB 컬렉션 이름: emr_model
export class EmrModel extends BaseEntity {
  @Column({ type: 'string' })
  emrUserObj: ObjectId; // emr_user의 식별값 (문자열, 필수)

  @Column({ type: 'string' })
  key: string; // 변수명 (문자열, 필수)

  @Column({ type: 'string' })
  value: string; // 값 (문자열, 필수)

  @Column({ type: 'bigint' })
  implementationTs: number; // 실시일자 (Unix 타임스탬프, 필수)
}
