import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/exception/all.exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './config/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.useLogger(logger);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter), );
  app.useGlobalPipes(new ValidationPipe({
    transform: true,  // DTO 클래스 타입으로 변환
    whitelist: true,  // DTO에 정의되지 않은 속성은 자동으로 제외
    forbidNonWhitelisted: true,  // DTO에 정의되지 않은 속성이 있을 경우 에러 발생
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
