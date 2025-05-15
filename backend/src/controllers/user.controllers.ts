import { Request, Response, NextFunction } from "express";
import {
  handleGetAllUser,
  handleCreateUser,
  handleLogin,
} from "../services/user.services";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await handleGetAllUser();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await handleCreateUser(req.body);
    return res.status(Number(response.status)).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const response = await handleLogin(req.body);
    return res.status(Number(response.status)).json(response);
  } catch (err) {
    console.log("Error", err);
  }
};

export { getAllUsers, createUser, loginController };
