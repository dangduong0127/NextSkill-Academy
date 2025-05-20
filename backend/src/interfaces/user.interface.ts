import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;
  age: number;
  avatar: string;
  phone: number;
}

export default IUser;
