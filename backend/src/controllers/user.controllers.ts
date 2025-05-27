import { Request, Response } from "express";
import {
  handleGetAllUser,
  handleCreateUser,
  handleLogin,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUserProfile,
} from "../services/user.services";
import { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  email?: string;
  role?: string;
}

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
    if (response.status === 200) {
      res.cookie("token", response.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 3600000,
      });
      res.status(200).json({
        status: 200,
        message: "Login Success",
      });
    } else {
      res.status(Number(response.status)).json(response);
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const response = await handleDeleteUser(userId);
    res.status(Number(response.status)).json(response);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = req.body;

    const response = await handleUpdateUser(userId, data);
    if (response) {
      res.status(Number(response.status)).json(response);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

const checkAuthController = async (req: Request, res: Response) => {
  try {
    const userId: string = (req.user as unknown as CustomJwtPayload).id;
    const { user } = await handleGetUserProfile(userId);

    res.status(200).json({
      user: {
        ...req.user,
        avatar: user?.avatar,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

const getUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Internal server error" });
  }
};

const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export {
  getAllUsers,
  createUser,
  loginController,
  deleteUserController,
  updateUserController,
  checkAuthController,
  getUserController,
  logoutController,
};
