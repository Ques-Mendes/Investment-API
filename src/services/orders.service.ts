import HttpException from '../helpers/http.exception';

import { IInvest, IInvestment, IInvestmentReturn, IOrder, IStockWithoutC } from '../interfaces';

import orderModel from '../models/order.model';
import stockModel from '../models/stock.model';
import stocksService from './stocks.service';

const getUserStocks = async (id: number): Promise<IOrder[]> => {
  const orders = await orderModel.getUserStocks(id);
  return orders as IOrder[];
};

const getAllOrders = async (): Promise<IInvest[]> => orderModel.getAllOrders();

const isAvaiable = async (stock: IStockWithoutC) => {
  const { stocksId, quantity } = stock;
  const stockIsAvaiable = await stocksService.getStockById(stocksId);
  if (!stockIsAvaiable || stockIsAvaiable.quantity < quantity) {
    throw new HttpException(400, 'Bad request!');
  }
  return [stockIsAvaiable.quantity, stockIsAvaiable.cost];
};

const isUser = async (order: IInvest) => {
  const userExists = await orderModel.verifyUser(order);
  if (!userExists.length) {
    throw new HttpException(400, 'Bad request!');
  }
};

const newOrder = async (order: IInvestment) => {
  const { stocksId, quantity } = order;
  await isUser(order);
  await isAvaiable({ stocksId, quantity });
  await stockModel.updateStock({ quantity, stocksId });
  const isOrder = await orderModel.isOrder(order);
  if (isOrder) {
    await orderModel.updateOrder(order);
  } else {
    await orderModel.createOrder(order);
  }
  return { ...order, message: 'Successfully done' } as IInvestmentReturn;
};

const isQuantity = async (order: IInvest) => {
  const { quantity } = order;
  const result = await orderModel.getOrderToSell(order);
  if (!result.length) {
    throw new HttpException(400, 'Bad Request!');
  }
  if (result[0].quantity < quantity) {
    throw new HttpException(400, 'You have insufficient stock to sell!');
  }
};

const sellOrder = async (order: IInvestment) => {
  await isUser(order);
  await isQuantity(order);
  // await stockModel.updateStock({ stocksId, quantity }); ? Don't know who is buying the stock ?
  await orderModel.updateUserStock(order);
  return { ...order, message: 'Successfully sold!!' } as IInvestmentReturn;
};

export default {
  getUserStocks,
  newOrder,
  sellOrder,
  getAllOrders,
};
