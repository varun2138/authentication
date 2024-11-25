import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MONGODB connected !! DB Host : ${connectionInstance.connection.host} `
    );
  } catch (error) {
    console.error(`mongoDB connection failed `, error);
    process.exit(1);
  }
};

export default connectDB;
