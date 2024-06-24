import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "654321";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Unauthorizes: Token is not available",
      });
    }

    const decode: any = jwt.verify(token, SECRET_KEY);
    if (!decode) {
      return res
        .send(404)
        .json({ success: false, message: "Unauthorized: Invalid token" });
    }
    // console.log(decode);

    const user = await userSchema.findById(decode.userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized: User not found" });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default authenticate;
