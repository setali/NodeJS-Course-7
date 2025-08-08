import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
    host: process.env.DATABASE_HOST,
  }
);
