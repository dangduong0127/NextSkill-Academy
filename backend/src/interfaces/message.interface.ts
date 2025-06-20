import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId | null;
  message: string;
  timestamp: Date;
}

export default IMessage;
