import { ApiError } from "exceptions/api.error";
import { Request, Response } from "express";
import { RequestHandler } from "express";
// import { validateUser } from "services/usersService";
import { StatusCodes } from "http-status-codes";
import { validateEmail, validatePassword } from "../utils/validation";
import { usersService, validateUser } from "../services/users.service";
import { authService } from "../services/auth.service";
import jwt from "jsonwebtoken";
import User from "models/user.model";
import dotenv from "dotenv";
// import { Op } from "sequelize";
dotenv.config();

const { SECRET = "" } = process.env;

const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    throw ApiError.BadRequest("All fields are required", {});
  }

  const emailError = validateEmail(email) || "";
  const passwordError = validatePassword(password) || "";

  if (emailError || passwordError) {
    throw ApiError.BadRequest("Validation error", {
      email: emailError,
      password: passwordError,
    });
  }

  const userExists = await usersService.getByEmail(email);

  if (userExists) {
    throw ApiError.BadRequest("User already exists", {
      email: "This e-mail address is used by another user.",
    });
  }

  const hashedPassword = await authService.hashPassword(password);
  const activationToken = authService.generateActivationToken();

  const user = await usersService.create({
    name,
    surname,
    email,
    password: hashedPassword,
    role: "user",
    activationToken,
  });

  // TODO: send activation email

  res.status(200).json(user);
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await validateUser(email, password);

    if (!user) {
      res.status(401).json("wrong email or password");
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      user: { email },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const refreshUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();

    res.json(users);
  } catch (error) {
    console.error("Błąd pobierania użytkowników:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const logOutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  console.log("token cleared");

  res.status(200).json({ message: "Logged out successfully" });
};

const isUserLogged = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json("User unauthorized");
    return;
  }

  try {
    const user = jwt.verify(token, SECRET);
    res.json({ user });
  } catch (error) {
    res.status(403).json({ error, message: "invalid token" });
  }
};

export const authController = {
  isUserLogged,
  logOutUser,
  registerUser,
  loginUser,
  getUsers,
  refreshUser,
};
