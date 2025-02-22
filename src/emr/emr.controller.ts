import { Body, Controller, Post } from '@nestjs/common';
import { EmrService } from './emr.service';

@Controller('emr')
export class EmrController {
  constructor(private emrService: EmrService) {
  }
  @Post('/list')
  async ems(@Body() body) {
    await this.emrService.addEmrs(body);
  }
}
