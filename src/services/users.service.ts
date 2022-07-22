import { IUser } from "../interfaces";
import userModel from "../models/user.model";

const newUser = async (user: IUser): Promise<IUser> => {
  const { insertId } = await userModel.createUser(user);
  const userCreated = { id: insertId, ...user, };
  return userCreated;
};

const getAllUsers = (): Promise<IUser[]> => userModel.getAllUsers();

const getUserById = async (id: number): Promise<IUser> => {
  const user = await userModel.getUserById(id);
  return user as IUser;
}

export default {
  newUser,
  getAllUsers,
  getUserById,
};