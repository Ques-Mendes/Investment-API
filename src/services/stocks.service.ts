import IStock from "../interfaces/stock.interface";
import stockModel from "../models/stock.model";

const getAllStocks = (): Promise<IStock[]> => stockModel.getAllStocks();

export default {
  getAllStocks,
};