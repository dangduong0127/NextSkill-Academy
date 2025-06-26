import mongoose, { Document } from "mongoose";

interface IMessage extends Document {
  room: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  content: string;
  fileUrl: string;
  fileType: string;
  createdAt: Date;
}

export default IMessage;
