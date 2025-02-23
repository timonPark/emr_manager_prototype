import { Body, Controller, Post } from '@nestjs/common';
import { EmrService } from './emr.service';
import { EmrRequestDto } from './dto/emr.request.dto';

@Controller('emr')
export class EmrController {
  constructor(private emrService: EmrService) {
  }
  @Post()
  async addEmr(@Body() emrRequestDto: EmrRequestDto) {
    await this.emrService.addEmr(emrRequestDto);
    return 'emr successfully';
  }

  @Post('/list')
  async emrs(@Body() body): Promise<string> {
    await this.emrService.addEmrs(body);
    return 'emrs successfully';
  }
}
