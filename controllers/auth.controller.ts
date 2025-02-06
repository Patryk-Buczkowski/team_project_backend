import { ApiError } from 'exceptions/api.error';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateEmail, validatePassword } from '../utils/validation';
import { usersService } from '../services/users.service';
import { authService } from '../services/auth.service';

const registerUser = async (req: Request, res: Response) => {
  const { name, surname, email, password } = req.body;

  if (!name || !surname || !email || !password) {
    throw ApiError.BadRequest('All fields are required', {});
  }

  const emailError = validateEmail(email) || '';
  const passwordError = validatePassword(password) || '';

  if (emailError || passwordError) {
    throw ApiError.BadRequest('Validation error', {
      email: emailError,
      password: passwordError,
    });
  }

  const userExists = await usersService.getByEmail(email);

  if (userExists) {
    throw ApiError.BadRequest('User already exists', {
      email: 'This e-mail address is used by another user.',
    });
  }

  const hashedPassword = await authService.hashPassword(password);
  const activationToken = authService.generateActivationToken();

  const user = await usersService.create({
    name,
    surname,
    email,
    password: hashedPassword,
    role: 'user',
    activationToken,
  });

  // TODO: send activation email

  res.status(StatusCodes.CREATED).send(user);
};

const loginUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
};

const logoutUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
};

const refreshUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
};

export const authController = {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
};
