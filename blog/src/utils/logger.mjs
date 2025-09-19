import winston from "winston";
import "winston-mongodb";

export const mongoTransport = new winston.transports.MongoDB({
  db: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
  collection: process.env.MONGODB_COLLECTION,
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // new winston.transports.File({ filename: "error.log", level: "error" }),
    // new winston.transports.File({ filename: "combined.log" }),
    mongoTransport,
  ],
});

export function log(data) {
  logger.log({ level: "info", ...data });
}
