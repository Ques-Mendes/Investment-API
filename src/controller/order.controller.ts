import { Request, Response } from "express";
import HttpException from "../helpers/http.exception";
import { IInvestment } from "../interfaces";
import ordersService from "../services/orders.service";

// const getOrders = async (req: Request, res: Response) => {
//   const ordersWithStocks = await ordersService.getOrders();
//   return res.status(200).json(ordersWithStocks);
// };
const getUserStocks = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);  
  const userWithStocks = await ordersService.getUserStocks(id);
  if (!userWithStocks) {
    throw new HttpException(404, 'Not Found');    
  }
  return res.status(200).json(userWithStocks);
};

const createOrder = async (req: Request, res: Response) => {
  
  console.log('OController', req.body);
  
  const order = req.body 
  const orderCreated = await ordersService.createOrder(order);
  return res.status(200).json(orderCreated);
};

export default {
  // getOrders,
  getUserStocks,
  createOrder,
};