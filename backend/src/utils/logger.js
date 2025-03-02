import winston from "winston";
import DailyRotate from "winston-daily-rotate-file";

const transport = new DailyRotate({
  filename: "logs/Aplication%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [transport],
});

export default logger;