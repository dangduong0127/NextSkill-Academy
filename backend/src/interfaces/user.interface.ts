import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: mongoose.Types.ObjectId;
  avatar: string;
  phone: number;
  address: string;
}

export default IUser;
