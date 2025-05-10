import { Request, Response } from "express";
import { handleGetAllUser } from "../services/user.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await handleGetAllUser();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsers };
