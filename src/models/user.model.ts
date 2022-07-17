import { IUser } from "../interfaces";
import connection from "./connection";

const getAllUsers = async (): Promise<IUser[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Investments.Users',
  );
  return rows as IUser[];
};

const getUserById = async (id: number): Promise<IUser> => {
  const result = await connection.execute(
    'SELECT * FROM Investments.Users WHERE id=?', [id]
  );
  const [rows] = result;
  const [user] = rows as IUser[];
  return user;
}

export default {
  getAllUsers,
  getUserById,
};