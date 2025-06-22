import { MessageModel } from "../models";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

const handleChatAdmin = async (userId: string) => {
  try {
    const messData = await MessageModel.find({
      room: new mongoose.Types.ObjectId(userId),
    }).select("-__v -_id");

    if (messData) {
      return {
        status: StatusCodes.OK,
        message: "User profile retrieved successfully",
        messData: messData,
      };
    } else {
      return {
        status: StatusCodes.NOT_FOUND,
        message: "User not found",
        messData: null,
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

export { handleChatAdmin };
