import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmrUserService } from '../emr-user/emr-user.service';

@Processor('emrQueue')
export class EmrProcessor {
  constructor(private readonly emrUserService: EmrUserService) {}

  @Process('emrs')
  async handleSendEmail(job: Job) {
    const emrs = job.data;
    console.log('EmrProcessor 실행');
    console.log(emrs);
  }
}
