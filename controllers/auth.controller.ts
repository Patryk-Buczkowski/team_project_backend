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
      sameSite: "strict",
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

const logoutUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
};

const refreshUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // const { email } = req.body;
    const users = await User.findAll();
    // const user = await User.findOne({
    //   where: { email: { [Op.iLike]: "PATRYK.BUCZKOWSKI@OUTLOOK.COM" } },
    // });
    res.json(users);
  } catch (error) {
    console.error("Błąd pobierania użytkowników:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const authController = {
  registerUser,
  loginUser,
  getUsers,
  logoutUser,
  refreshUser,
};
