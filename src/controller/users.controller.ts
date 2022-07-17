import { Request, Response } from "express";
import usersService from "../services/users.service";

const getAllUsers = async (_req: Request, res: Response): Promise<Response> => {
  const users = await usersService.getAllUsers();
  return res.status(200).json(users);
};

export default {
  getAllUsers,
};
