import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EmrRequestDto } from './dto/emr.request.dto';
import { EmrModel } from './entity/emr-model.entity';
import { EmrModelRepository } from './emr-model.repository';
import { EmrApiLogService } from '../emr-api-log/emr-api-log.service';
import { EmrUserService } from '../emr-user/emr-user.service';
import { EmrUser } from '../emr-user/entity/emr-user.entity';
import { convertToUnixTimestamp } from '../utility/time.utility';

@Injectable()
export class EmrService {
  private emrFields: string[] = ['bloodSugar', 'diastolicBloodPressure', 'systolicBloodPressure'];
  constructor(
    @InjectQueue('emrQueue') private emrQueue: Queue,
    private emrModelRepository: EmrModelRepository,
    private emrApiLogService: EmrApiLogService,
    private emrUserService: EmrUserService
  ) {}

  public addEmr = async(emrRequestDto: EmrRequestDto) => {
    await this.emrApiLogService.saveEmrApiLog(emrRequestDto);
    const emrUser:EmrUser = this.convertEmrRequestDtoToEmrUser(emrRequestDto);
    const searchEmrUser: EmrUser = await this.emrUserService.findOneByEmrUserInfo(emrUser)
    const fixEmrUser: EmrUser = searchEmrUser ? searchEmrUser : await this.emrUserService.saveEmrUser(emrUser);
    const emrModels:EmrModel[] = this.convertEmrRequestDtoToEmrModels(emrRequestDto, fixEmrUser);
    await this.saveEmrModels(emrModels, fixEmrUser);
    return;
  }

  private convertEmrRequestDtoToEmrUser = (emrRequestDto: EmrRequestDto) => {
    const emrUser:EmrUser = new EmrUser();
    emrUser.name = emrRequestDto.emrInfo.name;
    emrUser.birthday = emrRequestDto.emrInfo.birthday;
    emrUser.gender = emrRequestDto.emrInfo.gender;
    emrUser.phone = emrRequestDto.emrInfo.phone;
    emrUser.emrComCode = emrRequestDto.emrComCode;
    emrUser.ykiho = emrRequestDto.ykiho;
    return emrUser;
  }

  private convertEmrRequestDtoToEmrModels = (emrRequestDto: EmrRequestDto, fixEmrUser: EmrUser) => {
    const emrModels:EmrModel[] = [];
    for (const key of this.emrFields) {
      const emrModel: EmrModel = new EmrModel();
      const value = emrRequestDto.emrInfo[key];
      emrModel.emrUserObj = fixEmrUser.objectId;
      emrModel.key = key;
      emrModel.value = value;
      emrModel.implementationTs = convertToUnixTimestamp(emrRequestDto.emrInfo.implementationDate);
      emrModels.push(emrModel);
    }
    return emrModels;
  }

  private saveEmrModels = async(emrModels: EmrModel[], fixEmrUser: EmrUser) => {
    for (const emrModel of emrModels) {
      const searchEmrModel = await this.emrModelRepository.findModelsByEmrUserObjAndKey(fixEmrUser.objectId, emrModel.key);
      if (!searchEmrModel) {
        await this.emrModelRepository.createEmrModel(emrModel);
      } else {
        searchEmrModel.value = emrModel.value;
        searchEmrModel.implementationTs = emrModel.implementationTs;
        await this.emrModelRepository.updateEmrModel(searchEmrModel.objectId, searchEmrModel);
      }
    }

  }

  public addEmrs = async (emrs: any): Promise<void> => {
    await this.emrQueue.add('emrs', { emrs });
  }
}
