import { IAccount, IUser } from "../interfaces";
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

const balanceUpdate = async (deposit: IAccount) => {
  const { id, value } = deposit;
  await userModel.updateBalance({ id, value })
  return;
};

export default {
  newUser,
  getAllUsers,
  getUserById,
  balanceUpdate,
};