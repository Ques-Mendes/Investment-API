import { IUser } from "../interfaces";
import connection from "./connection";

const getAllUsers = async (): Promise<IUser[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Investments.Users',
  );
  return rows as IUser[];
};

export default {
  getAllUsers,
};