import { createLogger, format, LoggerOptions, transports } from 'winston';

const winstonLoggerOptions: LoggerOptions = {
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, requestId }) =>
      `[${requestId}]: ${timestamp} ${level}: ${message}`
    ),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/application.log' }),
  ],
};

export const logger = createLogger(winstonLoggerOptions);
