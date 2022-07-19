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
  SELECT * FROM Investments.Orders
  WHERE userId = ?`, [id]);
  console.log('model', orders);
  
  return orders as IOrder[];
}


export default {
  // getAllOrders,
  // getStocksIds,
  getUserStocks,
};