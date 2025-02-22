import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmrGroupSnapshot } from './entity/emr-group-snapshot.entity';
import { EmrGroupSnapshotRepository } from './emr-group-snapshot.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmrGroupSnapshot, EmrGroupSnapshotRepository]),
  ],
  providers: [EmrGroupSnapshotRepository],
  exports: [EmrGroupSnapshotRepository]
})
export class EmrGroupSnapshotModule {}
