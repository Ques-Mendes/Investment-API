import IStock from "../interfaces/stock.interface";
import connection from "./connection";

const getAllStocks = async (): Promise<IStock[]> => {
  const [rows] = await connection.execute(
    'SELECT * FROM Investments.Stocks',
  );
  return rows as IStock[];
};

export default {
  getAllStocks,
};