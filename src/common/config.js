import DotEnv from "dotenv";
import path from "path";

DotEnv.config({
  path: path.resolve("../../.env"),
});

const ENV = {
  DB_URL: process.env.DB_URL || "mongodb://localhost:27017/astron",
  PORT: process.env.PORT || 5500,
  BOT_TOKEN:
    process.env.BOT_TOKEN || "6039096389:AAE1JL2ZOQVjxUl_3j-vricszb4oXmqvcGg",
};
export default ENV;
