import { IInvestment, IOrder } from "../interfaces";

import orderModel from "../models/order.model";
import userModel from "../models/user.model";
// import stockModel from "../models/stock.model";

// const getOrders = async (): Promise<IOrderWithStocks[]> => {
//   const orders = await orderModel.getAllOrders();
//   const stocks = await stockModel.getAllStocks();

//   const ordersWithStocks = orders.map(({ id, userId }) => {
//     const stocksIds = stocks.filter(({ orderId }) => orderId === id).map((stock) => stock.id);
//     return { id, userId, stocksIds }; 
//   });
//   return ordersWithStocks as IOrderWithStocks[];
// };
const getUserStocks = async (id: number): Promise<IOrder[]> => {
  const orders = await orderModel.getUserStocks(id);  
  return orders as IOrder[];
};

const createOrder = async (order: IInvestment) => {
  console.log('OService', order);
  
  const { userId, stocksId, quantity } = order
  const orderCreated = await orderModel.createOrder(order); 
  console.log('orderCreatedSrvice', orderCreated);
   
  return orderCreated;
}

export default {
  // getOrders,
  getUserStocks,
  createOrder,
};

