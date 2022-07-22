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
  const stockIsAvaiable = await stocksService.getStockById(stocksId)
  stockIsAvaiable;  
  if (stockIsAvaiable.quantity < quantity) {
    throw new HttpException(400, 'Insufficient avaiable stock!' );
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


export default {
  // getOrders,
  getUserStocks,
  newOrder,

};
