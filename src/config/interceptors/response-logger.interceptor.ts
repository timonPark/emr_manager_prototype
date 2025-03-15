import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { WinstonLoggerService } from '../logger/winston-logger.service';

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: WinstonLoggerService) {
  }
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      tap((data) => {
        const statusCode = response.statusCode; // 응답 상태 코드
        const responseBody = JSON.stringify(data); // 응답 본문

        // 응답 로그를 기록
        this.loggerService.log(`Response sent - Status: ${statusCode} Body: ${responseBody}`);
      })
    );
  }

}