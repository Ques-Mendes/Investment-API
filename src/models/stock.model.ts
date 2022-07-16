import { IStock, IStockById } from "../interfaces/stock.interface";
import connection from "./connection";

const getAllStocks = async (): Promise<IStock[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Investments.Stocks',
  );
  return rows as IStock[];
};

const getStockById = async (id: number): Promise<IStockById> => {
  const result = await connection.execute(
    'SELECT * FROM Investments.Stocks WHERE id=?', [id]
  );
  const [rows] = result;
  const [stock] = rows as IStockById[];
  return stock;
}

export default {
  getAllStocks,
  getStockById,
};
