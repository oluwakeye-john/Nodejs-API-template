import winston, { Logger as Winston } from "winston";
import { Env } from "./env";

const env = Env();

export class Logger {
  private logger: Winston;
  constructor(name: string) {
    this.logger = winston.createLogger({
      level: "info",
      defaultMeta: { service: name },
      transports: [
        new winston.transports.File({
          filename: "./logs/error.log",
          level: "error",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.metadata(),
            winston.format.json()
          ),
        }),
        new winston.transports.File({
          filename: "./logs/combined.log",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.metadata(),
            winston.format.json()
          ),
        }),
      ],
    });

    if (env.NODE_ENV !== "production") {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.metadata({
              fillExcept: ["timestamp", "service", "level", "message"],
            }),
            winston.format.prettyPrint(),
            winston.format.colorize()
          ),
        })
      );
    }
  }

  debug(log: string, metadata?: any) {
    this.logger.debug(log, metadata);
  }

  info(log: string, metadata?: any) {
    this.logger.info(log, metadata);
  }

  error(log: string, metadata?: any) {
    this.logger.error(log, metadata);
  }

  log(level: "info" | "error" | "warn" | "debug", log: string, metadata?: any) {
    const metadataObject: any = {};

    if (metadata) metadataObject.metadata = metadata;
    this.logger[level](log, metadata);
  }
}

export const rootLogger = new Logger("root");
