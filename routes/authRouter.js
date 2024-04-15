import express from "express";
import validateBody from "../middlewares/validateBody.js";
import { loginSchema, registerSchema } from "../schemas/usersSchemas.js";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), registerUser);
authRouter.post("/login", validateBody(loginSchema), loginUser);
authRouter.get("/current", protect, getCurrentUser);

export default authRouter;
