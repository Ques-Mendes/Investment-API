import { Request, Response } from 'express';
import HttpException from '../helpers/http.exception';
import ordersService from '../services/orders.service';
import 'express-async-errors';

const getUserStocks = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const userWithStocks = await ordersService.getUserStocks(id);
  if (!userWithStocks) {
    throw new HttpException(404, 'Not Found');
  }
  return res.status(200).json(userWithStocks);
};

const createNewOrder = async (req: Request, res: Response) => {
  const order = req.body;
  const orderCreated = await ordersService.newOrder(order);
  return res.status(201).json(orderCreated);
};

const sellOrder = async (req: Request, res: Response) => {
  const orderToSell = req.body;
  const orderSold = await ordersService.sellOrder(orderToSell);
  return res.status(200).json(orderSold);
};

const getAllOrders = async (_req: Request, res: Response): Promise<Response> => {
  const orders = await ordersService.getAllOrders();
  return res.status(200).json(orders);
};
export default {
  getUserStocks,
  createNewOrder,
  sellOrder,
  getAllOrders,
};
