import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmrService {
  constructor(@InjectQueue('emrQueue') private emrQueue: Queue) {}

  public addEmrs = async (emrs: any): Promise<void> => {
    await this.emrQueue.add('emrs', { emrs });
  }
}
