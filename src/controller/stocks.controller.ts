import { Request, Response } from "express";
import stocksService from "../services/stocks.service"

const getAllStocks = async (_req: Request, res: Response): Promise<Response> => {
  const stocks = await stocksService.getAllStocks();
  return res.status(200).json(stocks);
};

export default {
  getAllStocks,
}