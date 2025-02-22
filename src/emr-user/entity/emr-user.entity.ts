// src/emr-user/emr-user.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../config/db/base.entity';
import { EmrComCode, Gender } from '../enum/emr-user.enum';


@Entity('emr_user') // MongoDB 컬렉션 이름: emr_user
export class EmrUser extends BaseEntity {
  @Column()
  name: string; // 환자 이름 (문자열, 필수)

  @Column({ type: 'varchar', length: 8 })
  birthday: string; // 생일 (yyyyMMdd 형식, 필수)

  @Column({ type: 'enum', enum: Gender })
  gender: Gender; // 성별 (M 또는 F, 필수)

  @Column({ type: 'char', length: 12 })
  phone: string; // 전화번호 (8210XXXXDDDD 형식, 12자리, 필수)

  @Column()
  ykiho: string; // 요양기관 식별번호 (문자열, 필수)

  @Column({ type: 'enum', enum: EmrComCode })
  emrComCode: EmrComCode; // 회사 코드 (A, B, C 중 하나, 필수)

  @Column({ type: 'bigint' })
  emrCurrentUpdateTs: number; // EMR 최근 수정일자 (Unix 타임스탬프, 필수)
}
