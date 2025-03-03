import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/authController.controller.js";
import authenticateUserCheck from "../middlewares/authenticationMiddleware.middleware.js";

const authRoute = Router();

authRoute.post("/login-user", loginUser);
authRoute.post("/logout-user",authenticateUserCheck,logoutUser)

export default authRoute;