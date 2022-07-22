import { IStock } from "../interfaces/stock.interface";
import connection from "./connection";


const getAllStocks = async (): Promise<IStock[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Stocks',
  );
  return rows as IStock[];
};

const getStockById = async (id: number): Promise<IStock> => {
  const result = await connection.execute(
    'SELECT * FROM Stocks WHERE id=?', [id]
  );
  const [rows] = result;  
  const [stock] = rows as IStock[];  
  return stock;
}

export default {
  getAllStocks,
  getStockById,
};
