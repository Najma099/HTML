import mongoose from "mongoose";
import config from "./config.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database`);
  }
  catch (err) {
    console.log("Failed to connect to db ${err.message}");
    process.exit(1);
  }
};