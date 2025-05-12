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
connectDB();

app.get("/", async (req, res) => {
  try {
    const response = await UserModel.find()
      .populate({
        path: "role",
        select: "-_id",
      })
      .select("-password -_id -__v ");
    // await UserModel.create({
    //   name: "Nguyen Van A",
    //   email: "a@example.com",
    //   role: "681f6d51a266955d8682a70e",
    //   password: "123456",
    //   age: 25,
    // });
    response.map((item) => console.log(item.email));
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

app.use(router);

app.listen(port, () => {
  console.log(`Server id running on port ${port}`);
});
