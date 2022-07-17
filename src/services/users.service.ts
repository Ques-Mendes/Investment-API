import { IUser } from "../interfaces";
import userModel from "../models/user.model";

const getAllUsers = (): Promise<IUser[]> => userModel.getAllUsers();

const getUserById = async (id: number): Promise<IUser> => {
  const user = await userModel.getUserById(id);
  return user as IUser;
}

export default {
  getAllUsers,
  getUserById,
};