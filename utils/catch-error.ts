import { NextFunction, Request, Response } from "express";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

const catchError = (middleware: MiddlewareFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default catchError;
