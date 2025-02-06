import { Router } from 'express';
import catchError from '../utils/catch-error';
const authRouter = Router();

authRouter.post('register', catchError());
authRouter.post('login', catchError());
authRouter.post('logout', catchError());
authRouter.get('refresh', catchError());

export default authRouter;
