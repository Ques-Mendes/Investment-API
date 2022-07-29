import HttpException from '../helpers/http.exception';
import { IAccount, IUser } from '../interfaces';
import userModel from '../models/user.model';

const newUser = async (user: IUser): Promise<IUser> => {
  const userEmail = await userModel.getUserByEmail(user);
  if (userEmail.length) {
    throw new HttpException(400, 'User already exists!');
  }
  const { insertId } = await userModel.createUser(user);
  const userCreated = { id: insertId, ...user };
  return userCreated;
};

const getAllUsers = (): Promise<IUser[]> => userModel.getAllUsers();

const getUserById = async (id: number): Promise<IUser> => {
  const user = await userModel.getUserById(id);
  return user as IUser;
};

// const getUserWithBalance = async (user: IUserBalance): Promise<IUserBalance> => {
//   const { id, balance } = user;
//   const result = await userModel.getUserWithBalance(id);
//   return user as IUserBalance;
// };

const balanceUpdate = async (deposit: IAccount) => {
  const { id, value } = deposit;
  const userAccount = await getUserById(id);
  if (!userAccount) {
    throw new HttpException(400, 'User do not exists');
  }
  await userModel.updateBalance({ id, value });
};

const isBalance = async (deposit: IAccount) => {
  const { id, value } = deposit;
  const totalBalance = await userModel.getUserById(id);
  if (totalBalance.balance < value) {
    throw new HttpException(400, 'You have insufficient balance to withdraw from!');
  }
  return [totalBalance];
};

const withdrawBalance = async (deposit: IAccount) => {
  const { id, value } = deposit;
  const userAccount = await getUserById(id);
  if (!userAccount) {
    throw new HttpException(400, 'User do not exists');
  }
  await isBalance(deposit);
  await userModel.withdrawBalance({ id, value });
};

export default {
  newUser,
  getAllUsers,
  getUserById,
  balanceUpdate,
  withdrawBalance,
  // getUserWithBalance,
};
