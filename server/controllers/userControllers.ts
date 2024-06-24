import { Request, Response } from "express";
import userSchema from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Hiiiiiii User");
    const users = await userSchema.find({});
    res.status(200).json({
      success: true,
      message: "All Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching User:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Hasing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userSchema.create({
      email,
      password: hashedPassword,
    });

    // Generate Token
    const token = jwt.sign(
      { email, hashedPassword },
      process.env.SECRET_KEY || "654321",
      { expiresIn: "24h" }
    );

    // Setting token as cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.status(201).json({
      success: true,
      message: "New User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create new user",
      error: error,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUser = await userSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      res
        .status(404)
        .json({ success: false, message: `User with id: ${id} not found` });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete User", error: error });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      {
        email,
        password: hashedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      res
        .status(404)
        .json({ success: false, message: `User with id: ${id} not found` });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete User", error: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid email" });
    }

    // Comparing the password provided with password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY || "654321",
      { expiresIn: "1h" }
    );

    // Set token as cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
