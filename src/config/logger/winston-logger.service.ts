import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from './logger';
import { RequestIdService } from '../middlewares/request-id.service'; // winston 로거

@Injectable()
export class WinstonLoggerService implements LoggerService {
  constructor(private readonly requestIdService: RequestIdService) {}

  log(message: string) {
    const requestId = this.requestIdService.getRequestId();  // 현재 requestId 가져오기
    logger.info(message, { requestId });
  }

  error(message: string, trace: string) {
    const requestId = this.requestIdService.getRequestId();
    logger.error(`${message} - ${trace}`, { requestId });
  }

  warn(message: string) {
    const requestId = this.requestIdService.getRequestId();
    logger.warn(message, { requestId });
  }

  debug(message: string) {
    const requestId = this.requestIdService.getRequestId();
    logger.debug(message, { requestId });
  }

  verbose(message: string) {
    const requestId = this.requestIdService.getRequestId();
    logger.verbose(message, { requestId });
  }
}
