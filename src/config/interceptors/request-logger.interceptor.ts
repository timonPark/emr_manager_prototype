import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { WinstonLoggerService } from '../logger/winston-logger.service';
import { Observable } from 'rxjs';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: WinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    // 요청 본문을 로그에 남깁니다.
    const body = JSON.stringify(request.body); // 요청 본문을 JSON으로 변환

    // 요청 로그를 기록
    this.loggerService.log(`Request received - Body: ${body}`);

    return next.handle(); // 응답 처리 후 ResponseLoggerInterceptor가 따로 처리할 것입니다.
  }
}