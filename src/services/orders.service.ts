import HttpException from "../helpers/http.exception";
import { IInvest, IInvestment, IInvestmentReturn, IOrder, IStockWithoutC } from "../interfaces";
import orderModel from "../models/order.model";
import stockModel from "../models/stock.model";
import stocksService from "./stocks.service";


const getUserStocks = async (id: number): Promise<IOrder[]> => {
  const orders = await orderModel.getUserStocks(id);  
  return orders as IOrder[];
};

const isAvaiable = async (stock: IStockWithoutC) => {
  const { stocksId, quantity } = stock; 
  const stockIsAvaiable = await stocksService.getStockById(stocksId); 
  if (stockIsAvaiable.quantity < quantity) {
    throw new HttpException(400, 'Insufficient avaiable stock to buy!' );
  }
  return [stockIsAvaiable.quantity, stockIsAvaiable.cost]
}; 


const newOrder = async (order: IInvestment) => {
  const { stocksId, quantity } = order;
  await isAvaiable({stocksId, quantity});
  await stockModel.updateStock({ quantity, stocksId });
  const isOrder = await orderModel.isOrder(order);
  if (isOrder) {
    await orderModel.updateOrder(order);
  } else {
    await orderModel.createOrder(order);
  }
  return {...order, message: 'Successfully done'} as IInvestmentReturn;
}

const isQuantity = async (order: IInvest) => {
  const { quantity } = order;
  const stockIsAvaiable = await orderModel.getOrderToSell(order)   
  if (stockIsAvaiable < quantity) {
     throw new HttpException(400, 'You have insufficient stock to sell!' );
  }
  return [stockIsAvaiable];
}

const sellOrder = async (order: IInvestment) => {
  await isQuantity(order);
  // await stockModel.updateStock({ stocksId, quantity }); ? Don't know who is buying the stock ?
  await orderModel.updateUserStock(order); 
  return {...order, message: 'Successfully sold!!'} as IInvestmentReturn;
};

export default {
  getUserStocks,
  newOrder,
  sellOrder,
};
