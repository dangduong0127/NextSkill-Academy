import mongoose, { Schema } from "mongoose";
import { IRoom } from "../interfaces";

const RoomSchema = new Schema<IRoom>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.model<IRoom>("Room", RoomSchema);
export default Room;
