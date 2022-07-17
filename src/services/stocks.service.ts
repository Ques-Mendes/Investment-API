import { IStock } from "../interfaces/stock.interface";
import stockModel from "../models/stock.model";

const getAllStocks = (): Promise<IStock[]> => stockModel.getAllStocks();

const getStockById = async (id: number): Promise<IStock> => {
  const stock = await stockModel.getStockById(id);
  return stock as IStock;
}

export default {
  getAllStocks,
  getStockById,
};