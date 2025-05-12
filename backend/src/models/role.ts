import mongoose, { Document, model, Schema } from "mongoose";
import { IRole } from "../interfaces";

const RoleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "role" }
);

const Role = mongoose.model<IRole>("Role", RoleSchema);
export default Role;
