import mongoose, { Schema } from "mongoose";
import type { ICourse } from "../interfaces";
const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  excerpt: { type: String, required: false },
  content: { type: String },
  price: { type: String },
  quantity: { type: Number },
  thumbnail: { type: String, required: false },
});

const Course = mongoose.model<ICourse>("Course", CourseSchema);
export default Course;
