import { Router, Request, Response } from "express";
import catchError from "../utils/catch-error";
import { authController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", catchError(authController.registerUser));
authRouter.post("/login", catchError(authController.loginUser));
authRouter.post("/logout", catchError(authController.logoutUser));
authRouter.get("/refresh", catchError(authController.refreshUser));
authRouter.get("/dupa", async (req: Request, res: Response) => {
  res.json("duek");
});

export default authRouter;
