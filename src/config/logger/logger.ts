import { createLogger, format, LoggerOptions, transports } from 'winston';

const winstonLoggerOptions: LoggerOptions = {
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, requestId }) =>
      JSON.stringify({
        timestamp,
        level,
        message,
        requestId
      })
    ),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: '/var/logs/application/nestjs/application.log' }),
  ],
};

export const logger = createLogger(winstonLoggerOptions);
