import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const registerUser = async (req: Request, res: Response) => {
  res.send(StatusCodes.OK);
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
