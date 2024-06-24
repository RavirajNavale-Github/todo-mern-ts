import express from "express";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/userControllers";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").delete(deleteUser).put(updateUser);

router.route("/login").post(loginUser);

export default router;
