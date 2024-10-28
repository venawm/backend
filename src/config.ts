import dotenv from "dotenv";
dotenv.config();
module.exports = {
  connection: process.env.DB_CONNECTION,
  port: process.env.PORT,
};
