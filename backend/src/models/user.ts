import mongoose, { Document, model, Types, Schema } from "mongoose";
import { IUser } from "../interfaces";

// Tạo schema cho model
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    avatar: { type: String, required: false },
    phoneNumber: { type: Number, required: false },
  },
  { collection: "users" }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
