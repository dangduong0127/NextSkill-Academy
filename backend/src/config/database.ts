import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iq4sxz5.mongodb.net/NextSkillDB`
    );

    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Something went wrong can not connect to MongoDB", err);
  }
};

export default connectDB;
