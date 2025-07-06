import type { Document } from "mongoose";

interface ICourse extends Document {
  title: string;
  excerpt: string;
  content: string;
  price: number | string;
  quantity: number;
  thumbnail: string;
}

export default ICourse;
