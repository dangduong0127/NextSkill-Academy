import { Request, Response } from "express";
import {
  handleGetAllUser,
  handleCreateUser,
  handleLogin,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUserProfile,
  handleRefreshToken,
  handleGetMessage,
} from "../services/user.services";
import { JwtPayload } from "jsonwebtoken";
// import ms from "ms";
import { StatusCodes } from "http-status-codes";

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
      res.cookie("accessToken", response.accessToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "development" ? false : true,
        // sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: true,
        sameSite: "none",
        maxAge: 3600000,
      });

      res.cookie("refreshToken", response.refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "development" ? false : true,
        // sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: true,
        sameSite: "none",
        maxAge: 86400000,
      });

      res.status(200).json({
        status: 200,
        message: "Login Success",
        userInfo: response.user,
      });
    } else {
      res.status(Number(response.status)).json(response);
    }
  } catch (err) {
    console.log("Error", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refresh_token = req.cookies?.refreshToken;
    const response = await handleRefreshToken(refresh_token);

    if (response?.status === StatusCodes.OK) {
      res.cookie("accessToken", response.createNewAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        // secure: process.env.NODE_ENV === "production" ? false : true,
        // sameSite: process.env.NODE_ENV === "production" ? "lax" : "none",
        maxAge: 3600000,
      });
    }

    res.status(StatusCodes.OK).json({
      message: "Refresh token successful",
      userInfo: response?.user,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
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
        name: user?.name,
        phone: user?.phone,
        age: user?.age,
        address: user?.address,
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
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ message: "Logout successful" });
};

const getMessageController = async (req: Request, res: Response) => {
  try {
    const userId = (req.user as unknown as CustomJwtPayload)?.id;
    if (!userId) throw new Error("User ID is required");

    const response = await handleGetMessage(userId);
    res.status(200).json({ messData: response });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
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
  refreshTokenController,
  getMessageController,
};
