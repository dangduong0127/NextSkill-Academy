import mongoose, { Document, Schema } from "mongoose";

// Định nghĩa interface cho document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  age: number;
  avatar: string;
  phoneNumber: number;
}

// Tạo schema cho model
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    avatar: { type: String, required: false },
    phoneNumber: { type: Number, required: false },
  },
  { collection: "users" }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
