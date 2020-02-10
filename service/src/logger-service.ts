import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const formatLog = printf(({ level, message, timestamp }) => {
  return `---${timestamp} ${level}: ${message}---`;
});

export const Logger = createLogger({
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    formatLog
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  Logger.add(new transports.Console({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      formatLog
    ),
  }));
}