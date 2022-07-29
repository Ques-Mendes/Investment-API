import { Request, Response } from 'express';
import HttpException from '../helpers/http.exception';
import usersService from '../services/users.service';
import { generateJWTToken } from '../helpers/JWT';
import 'express-async-errors';

const newUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await usersService.newUser(req.body);
  const token = generateJWTToken(user);
  return res.status(201).json(token);
};

// const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
//   const users = await usersService.getAllUsers();
//   return res.status(200).json(users);
// };

const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { id: idToken } = res.locals.payload.user;
  if (id !== idToken) {
    throw new HttpException(401, 'Unauthorized');
  }
  const user = await usersService.getUserById(id);
  if (!user) {
    throw new HttpException(404, 'Could not found user!');
  }
  return res.status(200).json(user);
};

const getUserWithBalance = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { id: idToken } = res.locals.payload.user;
  if (id !== idToken) {
    throw new HttpException(401, 'Unauthorized');
  }
  const user = await usersService.getUserWithBalance(id);
  if (!user) {
    throw new HttpException(404, 'Could not found user!');
  }
  return res.status(200).json(user);
};

const updateUserBalance = async (req: Request, res: Response) => {
  const balanceToUpdate = req.body;
  const balanceUpdated = await usersService.balanceUpdate(balanceToUpdate);
  return res.status(200).json(balanceUpdated);
};

const withdrawBalance = async (req: Request, res: Response) => {
  const balanceToUpdate = req.body;
  const balanceUpdated = await usersService.withdrawBalance(balanceToUpdate);
  return res.status(200).json(balanceUpdated);
};

export default {
  newUser,
  // getAllUsers,
  getUserById,
  updateUserBalance,
  withdrawBalance,
  getUserWithBalance,
};
