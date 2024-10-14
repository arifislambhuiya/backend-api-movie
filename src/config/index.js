import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connect_DB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected on Host Docker ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`Database connection faild `, error?.massae);
    process.exit(1);
  }
};

export default connect_DB;
