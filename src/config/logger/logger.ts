import { createLogger, format, LoggerOptions, transports } from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
const env = process.env.NODE_ENV;
import { utilities } from 'nest-winston';

console.log(env);

const dailyOptions = {
  level: 'http',
  datePattern: 'YYYY-MM-DD',
  dirname: '/var/logs/application/nestjs',
  filename: `app_%DATE%.log`,
  maxFiles: 30,
  zippedArchive: true,
  colorize: false,
  handleExceptions: true,
  json: false,
};

const winstonLoggerOptions: LoggerOptions = {
  transports: [
    // 콘솔 출력 트랜스포트
    new transports.Console({
      level: env === 'production' ? 'http' : 'silly',
      format:
        env === 'production'
          ? format.simple() // production 환경에서는 간단한 로그 출력
          : format.combine(
            format.timestamp(),
            utilities.format.nestLike('NestJS Project', {
              prettyPrint: true,
            })
          ),
    }),

    // 파일 출력 트랜스포트
    new winstonDaily(dailyOptions),
  ],
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, requestId }) =>
      JSON.stringify({
        timestamp,
        level,
        message,
        requestId,
      })
    )
  ),
};

export const logger = createLogger(winstonLoggerOptions);
