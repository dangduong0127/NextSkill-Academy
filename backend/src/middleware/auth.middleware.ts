import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
interface JwtPayload {
  user: {
    userId: string;
    role: string;
    email: string;
  };
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const access_token = req.cookies?.accessToken;
  if (!access_token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "No token provided" });
    return;
  }
  try {
    const accessTokenDecoded = jwt.verify(
      access_token,
      process.env.JWT_ACCESS_TOKEN_SECRET
    ) as JwtPayload;
    req.user = accessTokenDecoded;
    next();
  } catch (err: any) {
    if (err.message?.includes("jwt expired")) {
      res
        .status(StatusCodes.GONE)
        .json({ status: StatusCodes.GONE, message: "Token expired" });
      return;
    }
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized pls login again" });
  }
};

export default authMiddleware;
