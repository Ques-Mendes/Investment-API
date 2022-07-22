import { IInvestment, IInvestmentReturn, IOrder, IStock } from "../interfaces";
import orderModel from "../models/order.model";


const getUserStocks = async (id: number): Promise<IOrder[]> => {
  const orders = await orderModel.getUserStocks(id);  
  return orders as IOrder[];
};


const newOrder = async (order: IInvestment) => {   
  const isOrder = await orderModel.isOrder(order);
  if (isOrder) {
    await orderModel.updateOrder(order);
  } else {
    await orderModel.createOrder(order);
  }
  return {...order, message: 'Successfully created'} as IInvestmentReturn;
}


export default {
  // getOrders,
  getUserStocks,
  newOrder,

};
