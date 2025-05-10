import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserModel from "./models/user";
import router from "./routes";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.iq4sxz5.mongodb.net/NextSkillDB`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", async (req, res) => {
  try {
    const response = await UserModel.find();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server id running on port ${port}`);
});
