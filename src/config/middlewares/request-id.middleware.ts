import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'
import { RequestIdService } from './request-id.service';
import { NextFunction } from 'express';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly requestIdService: RequestIdService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();  // 새로운 UUID 생성
    req['requestId'] = requestId;  // 요청에 requestId 추가
    this.requestIdService.setRequestId(requestId);  // RequestIdService에 설정
    next();
  }
}