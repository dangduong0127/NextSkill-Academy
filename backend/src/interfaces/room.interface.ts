import mongoose, { Document } from "mongoose";

export default interface IRoom extends Document {
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}
