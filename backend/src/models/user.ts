import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces";

// Tạo schema cho model
const UserSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    avatar: { type: String, required: false },
    phone: { type: Number, required: false },
  },
  { collection: "users" }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
