import { Request, Response, NextFunction } from "express";
import {
  handleGetAllUser,
  handleCreateUser,
  handleLogin,
} from "../services/user.services";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await handleGetAllUser();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await handleCreateUser(req.body);
    res.status(Number(response.status)).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await handleLogin(req.body);
    res.status(Number(response.status)).json(response);
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllUsers, createUser, loginController };
