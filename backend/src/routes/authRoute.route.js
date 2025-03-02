import { Router } from "express";
import { loginUser } from "../controllers/authController.controller.js";

const authRoute = Router();

authRoute.post("/login-user", loginUser);

export default authRoute;