import { ResultSetHeader } from "mysql2";
import { IStock, IStockWithoutC } from "../interfaces/stock.interface";
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

const updateStock = async (stock: IStockWithoutC): Promise<ResultSetHeader> => {
  const { stocksId, quantity } = stock;
  const [stockUpdated] = await connection.execute<ResultSetHeader>(
    `UPDATE Stocks SET quantity = quantity- ? WHERE id=?`,
    [quantity, stocksId]
  );
  return stockUpdated;
}

export default {
  getAllStocks,
  getStockById,
  updateStock
};
