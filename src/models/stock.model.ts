import { IStock } from "../interfaces/stock.interface";
import connection from "./connection";

const getAllStocks = async (): Promise<IStock[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Investments.Stocks',
  );
  return rows as IStock[];
};

const getStockById = async (id: number): Promise<IStock> => {
  const result = await connection.execute(
    'SELECT * FROM Investments.Stocks WHERE id=?', [id]
  );
  const [rows] = result;
  console.log('rowsModel', rows);
  
  const [stock] = rows as IStock[];
  console.log('stock',stock);
  
  return stock;
}

export default {
  getAllStocks,
  getStockById,
};
