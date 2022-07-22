// import { IOrderStockId, IOrderUserId } from "../interfaces";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IInvest, IInvestment, IStock, IStockWithoutC } from "../interfaces";
import { IOrder } from "../interfaces/order.interface";
import connection from "./connection";

const getUserStocks = async (id: number):Promise<IOrder[]> => {
  const [orders] = await connection.execute(`  
  SELECT o.userId AS userId,
s.id AS stocksId,
o.quantity AS quantity,
s.cost AS cost
FROM Orders AS o
INNER JOIN Stocks AS s
ON o.stocksId = s.id
WHERE o.userId = ?;`, [id]);  
  return orders as IOrder[];
}

const isOrder = async (order: IInvest): Promise<boolean> => {
  const { userId, stocksId } = order;  
  const [orderExist]  = await connection.execute<RowDataPacket[]>(
  'SELECT * FROM Orders WHERE userId=? AND stocksId=?',
  [userId, stocksId]);
  orderExist as IInvestment[]
  if (orderExist.length === 0) return false;
  return true;
}

const createOrder = async (order: IInvest): Promise<ResultSetHeader> => { 
  const { userId, stocksId, quantity } = order;  
  const [orderCreated] = await connection.execute<ResultSetHeader>( 
  `INSERT INTO Orders (userId, stocksId, quantity) VALUES (?, ?, ?)`,
  [userId, stocksId, quantity]
  );
  return orderCreated;  
}

const updateOrder = async (order: IInvest): Promise<ResultSetHeader> => {
  const { userId, stocksId, quantity } = order;
  const [orderUpdated] = await connection.execute<ResultSetHeader>(
    `UPDATE Orders SET  quantity = quantity+ ? WHERE userId=? AND stocksId=?`,
    [quantity, userId, stocksId]
  );
  return orderUpdated;
}

const updateUserStock = async (order: IInvest): Promise<ResultSetHeader> => {
  const { userId, stocksId, quantity } = order;
  const [orderUpdated] = await connection.execute<ResultSetHeader>(
    `UPDATE Orders SET  quantity = quantity- ? WHERE userId=? AND stocksId=?`,
    [quantity, userId, stocksId]
  );
  return orderUpdated;
}

const getOrderToSell = async (order: IInvest): Promise<number> => {
  const { userId, stocksId } = order;
  const [[{quantity}]] = await connection.execute<RowDataPacket[]>(
    `SELECT quantity FROM Orders
    WHERE stocksId = ? AND userId = ?`,
    [stocksId, userId]
  );
  return quantity;
};

export default {
  getUserStocks,
  createOrder,
  updateOrder,
  isOrder,
  updateUserStock,
  getOrderToSell,
}