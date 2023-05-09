import mongoose from "mongoose";
import ENV from "../config.js";

export default async function connectDb() {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(ENV.DB_URL);
    console.log("connected");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
