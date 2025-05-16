import express from "express";
import dotenv from "dotenv";

// import UserModel from "./models/user";
import { UserModel } from "./models";
import router from "./routes";
import connectDB from "./config/database";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
connectDB();

app.get("/", async (req, res) => {
  try {
    const response = await UserModel.find()
      .populate({
        path: "role",
        select: "-_id",
      })
      .select("-password -_id -__v ");

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server id running on port ${port}`);
});
