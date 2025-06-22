import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handleChatAdmin } from "../services/dashboard.services";

const chatAdminController = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId;
    if (!userId) throw new Error("User ID is required");
    const chat = await handleChatAdmin(userId);

    res
      .status(StatusCodes.OK)
      .json({ message: "fetch message user successfully", chat });
  } catch (err) {
    console.error(err);
  }
};

export { chatAdminController };
