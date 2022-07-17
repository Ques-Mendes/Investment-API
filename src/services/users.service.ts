import { IUser } from "../interfaces";
import userModel from "../models/user.model";

const getAllUsers = (): Promise<IUser[]> => userModel.getAllUsers();

export default {
  getAllUsers,
};