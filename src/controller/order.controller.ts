import { Request, Response } from "express";
import HttpException from "../helpers/http.exception";
import ordersService from "../services/orders.service";

// const getOrders = async (req: Request, res: Response) => {
//   const ordersWithStocks = await ordersService.getOrders();
//   return res.status(200).json(ordersWithStocks);
// };
const getUserStocks = async (req: Request, res: Response) => {
  console.log('pa', req.params);
  
  const id = parseInt(req.params.id);
  console.log('controller', id);
  
  const userWithStocks = await ordersService.getUserStocks(id);
  if (!userWithStocks) {
    throw new HttpException(404, 'Not Found');    
  }
  return res.status(200).json(userWithStocks);
};

export default {
  // getOrders,
  getUserStocks,
};