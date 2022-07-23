import HttpException from "../helpers/http.exception";
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

const isBalance = async (deposit: IAccount) => {
  const { id, value } = deposit;
  const totalBalance = await userModel.getUserById(id);  
  if (totalBalance.balance < value) {
    throw new HttpException(400, 'You have insufficient balance to withdraw for!' );
  }
  return [totalBalance];
};

const withdrawBalance = async (deposit: IAccount) => {
  const { id, value } = deposit;
  await isBalance(deposit);
  await userModel.withdrawBalance({ id, value })
  return
};

export default {
  newUser,
  getAllUsers,
  getUserById,
  balanceUpdate,
  withdrawBalance,
};