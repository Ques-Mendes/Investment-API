import { Request, Response } from "express";
import ordersService from "../services/orders.service";

const getOrders = async (req: Request, res: Response) => {
  const ordersWithStocks = await ordersService.getOrders();
  return res.status(200).json(ordersWithStocks);
};

export default {
  getOrders,
};