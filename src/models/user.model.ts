import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IAccount, IUser } from "../interfaces";
import connection from "./connection";

const createUser = async (user: IUser): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Users (email, password, balance) VALUES (?, ?, ?)',
    [user.email, user.password, user.balance],
  );  
  return result;
};

const getUserByEmail = async (user: IUser): Promise<IUser[]> => {
  const { email } = user;
  const [userEmail] = await connection.execute(
    'SELECT email FROM Users WHERE email=?',
    [email]
  );
  console.log('email', email);
  
  return userEmail as IUser[];
}
const getAllUsers = async (): Promise<IUser[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Users',
  );
  return rows as IUser[];
};

const getUserById = async (id: number): Promise<IUser> => {
  const result = await connection.execute(
    'SELECT * FROM Users WHERE id=?', [id]
  );
  const [rows] = result;
  const [user] = rows as IUser[];
  return user;
}

const updateBalance = async (deposit: IAccount): Promise<ResultSetHeader> => {  
  const { id, value } = deposit;
  const [balanceUpdated] = await connection.execute<ResultSetHeader>(
    `UPDATE Users SET balance = balance+ ? WHERE id=?`,
    [value, id]
  );
  return balanceUpdated;
}

const withdrawBalance = async (withdraw: IAccount): Promise<ResultSetHeader> => {
  const { id, value } = withdraw;
  const [balanceUpdated] = await connection.execute<ResultSetHeader>(
    `UPDATE Users SET balance = balance- ? WHERE id=?`,
    [value, id]
  );
  return balanceUpdated;
}

const getBalanceAmount = async (balance: IAccount): Promise<number> => {
  const { id } = balance;
  const [[{ value }]] = await connection.execute<RowDataPacket[]>(
    `SELECT balance FROM Users WHERE id=?`,
    [id]    
  );
  return value;
}

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateBalance,
  withdrawBalance,
  getBalanceAmount,
  getUserByEmail
};
