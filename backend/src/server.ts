import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import connectDB from "./config/database";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import initSocket from "./socket";
import fs from "fs";
import { rateLimit } from "express-rate-limit";
import ms from "ms";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());

const limiter = rateLimit({
  windowMs: ms("15 minutes"),
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// Fix Cache from disk from ExpressJS
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

app.get("/debug-files", (_req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "uploads"));
  res.json({ files });
});

app.use(limiter);
app.use(router);

const server = http.createServer(app);
initSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
