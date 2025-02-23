import { Injectable } from '@nestjs/common';

import { EmrApiLogRepository } from './emr-api-log.repository';
import { EmrRequestDto } from '../emr/dto/emr.request.dto';
import { EmrApiLog } from './entity/emr-api-log.entity';


@Injectable()
export class EmrApiLogService {
  constructor(
    private emrApiLogRepository: EmrApiLogRepository
  ) {}
  public saveEmrApiLog = async (emrData: EmrRequestDto)=> {
    const emrApiLog = new EmrApiLog();
    emrApiLog.requestBody = emrData;
    await this.emrApiLogRepository.createEmrApiLog(emrApiLog);
  }
}
