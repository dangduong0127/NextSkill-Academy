import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import connectDB from "./config/database";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);
connectDB();

app.use("/src/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);

app.listen(port, () => {
  console.log(`Server id running on port ${port}`);
});
