import express from "express";
import {
  getAllTodos,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todoControllers";
import authenticate from "../middleware/authentication";

const router = express.Router();

router.route("/").get(getAllTodos).post(authenticate, createTodo);

router
  .route("/:id")
  .get(authenticate, getTodo)
  .delete(authenticate, deleteTodo)
  .put(authenticate, updateTodo);

export default router;
