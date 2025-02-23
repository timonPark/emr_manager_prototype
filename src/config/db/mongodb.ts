import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EmrUser } from '../../emr-user/entity/emr-user.entity';
import { EmrModel } from '../../emr/entity/emr-model.entity';
import { EmrApiLog } from '../../emr-api-log/entity/emr-api-log.entity';
import { EmrGroupSnapshot } from '../../emr-group-snapshot/entity/emr-group-snapshot.entity';

export const mongoDBConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'mongodb',
  host: configService.get<string>('MONGO_HOST', 'localhost'),      // 기본값은 localhost
  port: configService.get<number>('MONGO_PORT', 27017),            // 기본값은 27017
  username: configService.get<string>('MONGO_USERNAME'),   // 기본값은 admin
  password: configService.get<string>('MONGO_PASSWORD'),           // 환경 변수에서 비밀번호 가져오기
  database: configService.get<string>('MONGO_DATABASE', 'emrDatabase'),  // 기본값은 emrDatabase
  authSource: configService.get<string>('MONGO_AUTH_SOURCE', 'admin'), // 기본값은 admin
  synchronize: configService.get<boolean>('MONGO_SYNCHRONIZE', true),  // 개발 환경에서는 true
  entities: [EmrUser, EmrModel, EmrApiLog, EmrGroupSnapshot],  // 엔티티 배열
});
