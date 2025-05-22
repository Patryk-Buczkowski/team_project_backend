import { Router } from "express";
import catchError from "../utils/catch-error";
import { authController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", catchError(authController.registerUser));
authRouter.post("/login", catchError(authController.loginUser));
authRouter.post("/logout", catchError(authController.logoutUser));
authRouter.get("/refresh", catchError(authController.refreshUser));
authRouter.get("/isUserLogged", authController.isUserLogged);
authRouter.get("/get", authController.getUsers);

export default authRouter;
