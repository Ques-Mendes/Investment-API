import { Request, Response } from 'express';
import { generateJWTToken } from '../helpers/JWT';
import loginService from '../services/login.service';
import 'express-async-errors';

const login = async (req: Request, res: Response) => {
  const user = await loginService.userLogin(req.body);
  const token = generateJWTToken({ ...user[0] });
  return res.status(200).json({ token });
};

export default {
  login,
};
