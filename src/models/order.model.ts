// import { IOrderStockId, IOrderUserId } from "../interfaces";
import IOrder from "../interfaces/order.interface";
import connection from "./connection";

// const getAllOrders = async (): Promise<IOrderUserId[]> => {
//   const [orders] = await connection.execute(
//     'SELECT * FROM Investments.Orders'
//   );
//   return orders as IOrderUserId[];
// };

// const getStocksIds = async (id: number): Promise<IOrderStockId[]> => {
//   const [stocks] = await connection.execute(`SELECT s.id AS stockId
//   FROM Investments.Orders AS o
//   INNER JOIN Investments.Stocks AS s
//   ON s.orderId = o.id
//   WHERE o.id = ?`, [id]);
//   return stocks as IOrderStockId[];
// };
const getUserStocks = async (id: number):Promise<IOrder[]> => {
  const [orders] = await connection.execute(`  
  SELECT o.userId AS userId,
s.id AS stocksId,
o.quantity AS quantity,
s.cost AS cost
FROM Investments.Orders AS o
INNER JOIN Investments.Stocks AS s
ON o.stocksId = s.id
WHERE o.userId = 2;`, [id]);  
  return orders as IOrder[];
}


export default {
  // getAllOrders,
  // getStocksIds,
  getUserStocks,
};