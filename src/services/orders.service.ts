import { IOrderWithStocks } from "../interfaces";
import orderModel from "../models/order.model";
import stockModel from "../models/stock.model";

const getOrders = async (): Promise<IOrderWithStocks[]> => {
  const orders = await orderModel.getAllOrders();
  const stocks = await stockModel.getAllStocks();

  const ordersWithStocks = orders.map(({ id, userId }) => {
    const stocksIds = stocks.filter(({ orderId }) => orderId === id).map((stock) => stock.id);
    return { id, userId, stocksIds }; 
  });
  return ordersWithStocks as IOrderWithStocks[];
};

export default {
  getOrders,
};

