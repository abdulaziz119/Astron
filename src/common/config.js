import DotEnv from "dotenv";
import path from "path";

DotEnv.config({
  path: path.resolve("../../.env"),
});

const ENV = {
  DB_URL:
    process.env.DB_URL ||
    "mongodb+srv://gitlap10:996428268@astron.yewe0o4.mongodb.net/27017",
  PORT: process.env.PORT || 5500,
};
export default ENV;
