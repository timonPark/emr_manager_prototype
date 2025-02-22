// src/common/entities/base.entity.ts
import { ObjectIdColumn, ObjectId, Column, BaseEntity as TypeOrmBaseEntity } from 'typeorm';
import { BeforeInsert, BeforeUpdate } from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @ObjectIdColumn()
  objectId: ObjectId;

  @Column({ type: 'bigint' })
  createdTs: number;

  @Column({ type: 'bigint' })
  updatedTs: number;

  // 엔티티가 삽입되기 전에 호출되는 훅
  @BeforeInsert()
  setCreatedTs() {
    this.createdTs = Date.now(); // 현재 Unix 타임스탬프
  }

  // 엔티티가 업데이트되기 전에 호출되는 훅
  @BeforeUpdate()
  setUpdatedTs() {
    this.updatedTs = Date.now(); // 현재 Unix 타임스탬프
  }
}
