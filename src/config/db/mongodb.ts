import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EmrUser } from '../../emr-user/entity/emr-user.entity';

export const mongoDBConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'host.docker.internal',        // MongoDB 컨테이너 호스트 (Docker의 경우 localhost)
  port: 27017,              // MongoDB 기본 포트
  username: 'admin',        // MongoDB ID
  password: 'mongo20250222',// MongoDB 비밀번호
  database: 'emrDatabase',         // 사용할 MongoDB 데이터베이스 이름
  synchronize: true,        // 개발 중에는 true, 프로덕션에서는 false
  entities: [
    EmrUser
  ]
};
