import { UserModel } from "../models";
import { IUser } from "../interfaces";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ms from "ms";
import { StatusCodes } from "http-status-codes";
const saltRounds = 10;

const handleGetAllUser = async () => {
  try {
    const users = await UserModel.find()
      .populate({ path: "role", select: "-_id" })
      .select("-password -__v");
    return users;
  } catch (err) {
    throw err;
  }
};

const handleCreateUser = async (data: IUser) => {
  try {
    const validate = () => {
      if (!data.phone)
        throw { status: 201, message: "Phone number is required" };

      if (!data.email) throw { status: 201, message: "Email is required" };

      if (!data.password)
        throw { status: 201, message: "Password is required" };
    };
    validate();

    //hash password
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    const user = await UserModel.create({
      name: data.name ?? "",
      email: data.email,
      password: hashedPassword,
      role: "681f6d5fa266955d8682a70f",
      age: data.age ?? "",
      avatar: data.avatar ?? "",
      phone: data.phone ?? "",
    });
    if (user) {
      return {
        status: 201,
        message: "User created successfully",
      };
    } else {
      return {
        status: 201,
        message: "User created false",
      };
    }
  } catch (err: any) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return {
        status: 201,
        message: "Email already exists",
      };
    }

    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

const handleLogin = async (data: IUser) => {
  try {
    if (!data.email) throw { status: 201, message: "Email is required" };
    if (!data.password) throw { status: 201, message: "Password is required" };
    const user = await UserModel.findOne({ email: data.email });
    if (user) {
      const comparePass = await bcrypt.compare(data.password, user.password);
      if (comparePass) {
        // const jwtOptions: jwt.SignOptions = {
        //   expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
        // };
        const userInfo = {
          id: user._id,
          email: user.email,
          role: user.role,
        };

        const access_token = jwt.sign(
          userInfo,
          process.env.JWT_ACCESS_TOKEN_SECRET!,
          {
            algorithm: "HS256",
            expiresIn: ms("1h"),
          }
        );

        const refresh_token = jwt.sign(
          userInfo,
          process.env.JWT_REFRESH_TOKEN_SECRET!,
          {
            algorithm: "HS256",
            expiresIn: ms("1d"),
          }
        );

        return {
          status: 200,
          accessToken: access_token,
          refreshToken: refresh_token,
          user: userInfo,
        };
      } else {
        return {
          status: 201,
          message: "Invalid password",
        };
      }
    } else {
      return {
        status: 201,
        message: "Email is not registered",
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};
const handleDeleteUser = async (userId: string) => {
  try {
    if (!userId) throw { status: 201, message: "User ID is required" };

    const user = await UserModel.findByIdAndDelete(userId);
    if (user) {
      return {
        status: 200,
        message: "User deleted successfully",
      };
    } else {
      return {
        status: 404,
        message: "User not found",
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

const handleUpdateUser = async (userId: string, data: IUser) => {
  try {
    if (!userId) throw new Error("missing required field: userId");
    if (!data) throw new Error("missing  required data");

    const user = await UserModel.findByIdAndUpdate(userId, data, { new: true });
    if (user) {
      return {
        status: 200,
        message: "User updated successfully",
        user: user,
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

const handleGetUserProfile = async (userId: string) => {
  try {
    if (!userId) throw new Error("missing required field: userId");
    const user = await UserModel.findById(userId).select("-password -__v");
    if (user) {
      return {
        status: 200,
        message: "User profile retrieved successfully",
        user: user,
      };
    } else {
      return {
        status: 404,
        message: "User not found",
        user: null,
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

const handleRefreshToken = async (refreshToken: string) => {
  try {
    if (refreshToken) {
      const refreshTokenDecoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_TOKEN_SECRET
      );
      if (typeof refreshTokenDecoded === "string") {
        throw new Error("Invalid refresh token format");
      }
      if (!refreshTokenDecoded || !refreshTokenDecoded.id) {
        throw new Error("Invalid refresh token");
      }

      const createNewAccessToken = jwt.sign(
        {
          id: refreshTokenDecoded.id,
          email: refreshTokenDecoded.email,
          role: refreshTokenDecoded.role,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: ms("1h") }
      );

      return {
        status: StatusCodes.OK,
        createNewAccessToken,
        user: {
          id: refreshTokenDecoded.id,
          email: refreshTokenDecoded.email,
          role: refreshTokenDecoded.role,
        },
      };
    }
  } catch (err: any) {
    return {
      status: err.status ?? 500,
      message: err.message ?? "Internal server error",
    };
  }
};

export {
  handleGetAllUser,
  handleCreateUser,
  handleLogin,
  handleDeleteUser,
  handleUpdateUser,
  handleGetUserProfile,
  handleRefreshToken,
};
