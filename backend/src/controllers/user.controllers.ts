import { Request, Response } from "express";
import { handleGetAllUser, handleCreateUser } from "../services/user.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await handleGetAllUser();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const response = await handleCreateUser(req.body);
    return res.status(Number(response.status)).json(response);
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsers, createUser };
