// import dotenv from "dotenv";
import { Sequelize } from "sequelize";
// dotenv.config();

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
});

export default sequelize;
