import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

const dbConnect = async (): Promise<void> => {
  try {
    const url = "mongodb://127.0.0.1:27017/todo";

    await mongoose.connect(url);
    console.log("DB connected");
  } catch (err) {
    console.log("Error in connecting to DB: ", err);
  }
};

export default dbConnect;
