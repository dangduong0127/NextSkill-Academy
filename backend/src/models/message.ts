import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces";

const MessageSchema = new Schema<IMessage>(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    fileUrl: {
      type: String,
    },
    fileType: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "message",
  }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
