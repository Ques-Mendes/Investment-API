import { IStock, IStockById } from "../interfaces/stock.interface";
import stockModel from "../models/stock.model";

const getAllStocks = (): Promise<IStock[]> => stockModel.getAllStocks();

const getStockById = async (id: number): Promise<IStockById> => {
  const stock = await stockModel.getStockById(id);
  return stock;
}

export default {
  getAllStocks,
  getStockById,
};