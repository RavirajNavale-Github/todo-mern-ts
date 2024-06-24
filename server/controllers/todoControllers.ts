import { Request, Response } from "express";
import todoSchema from "../models/todoSchema";

export const getAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("Hiiiii Todo");
    const todos = await todoSchema.find();
    res.status(200).json({
      success: true,
      message: "All todos fetched successfully",
      data: todos,
    });
  } catch (error) {
    console.log("Todo Catch");
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch todos", error: error });
  }
};

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;
    const newTodo = await todoSchema.create({ title, description });
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create todo", error: error });
  }
};

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    // console.log(id);
    const todo = await todoSchema.findById(id);

    if (!todo) {
      res
        .status(404)
        .json({ success: false, message: `Todo with i ${id} not found` });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo fecthed successfully",
        data: todo,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch todo", error: error });
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    // console.log(id);
    const deletedTodo = await todoSchema.findByIdAndDelete(id);

    if (!deletedTodo) {
      res
        .status(404)
        .json({ success: false, message: `Todo with id: ${id} not found` });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo deleted successfully",
        data: deletedTodo,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete todo", error: error });
  }
};

export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    // console.log(id);
    const { title, description } = req.body;
    const updatedTodo = await todoSchema.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedTodo) {
      res
        .status(404)
        .json({ success: false, message: `Todo with i ${id} not found` });
    } else {
      res.status(200).json({
        success: true,
        message: "Todo updated successfully",
        data: updatedTodo,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update todo", error: error });
  }
};
