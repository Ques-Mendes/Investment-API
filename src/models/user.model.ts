import { ResultSetHeader } from "mysql2";
import { IUser } from "../interfaces";
import connection from "./connection";

const createUser = async (user: IUser): Promise<ResultSetHeader> => {
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO Users (email, password, balance) VALUES (?, ?)',
    [user.email, user.password, user.balance],
  );
  return result;
};

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

export default {
  createUser,
  getAllUsers,
  getUserById,
};