import { Request, Response } from "express";
import HttpException from "../helpers/http.exception";
import ordersService from "../services/orders.service";
import 'express-async-errors';

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

const createNewOrder = async (req: Request, res: Response) => {  
  const order = req.body     
  const orderCreated = await ordersService.newOrder(order);
  return res.status(201).json(orderCreated);
};

export default {
  // getOrders,
  getUserStocks,
  createNewOrder,
};