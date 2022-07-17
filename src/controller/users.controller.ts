import { Request, Response } from "express";
import HttpException from "../helpers/http.exception";
import usersService from "../services/users.service";
import 'express-async-errors';

const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  const users = await usersService.getAllUsers();
  return res.status(200).json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await usersService.getUserById(id);
  if (!user) {
    throw new HttpException(404, 'Could not found user!');    
  }
  return res.status(200).json(user);
};

export default {
  getAllUsers,
  getUserById,
};
