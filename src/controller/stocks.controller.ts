import { Request, Response } from 'express';
import HttpException from '../helpers/http.exception';
import stocksService from '../services/stocks.service';
import 'express-async-errors';

const getAllStocks = async (_req: Request, res: Response): Promise<Response> => {
  const stocks = await stocksService.getAllStocks();
  return res.status(200).json(stocks);
};

const getStockById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const stock = await stocksService.getStockById(id);
  if (!stock) {
    throw new HttpException(404, 'Could not found stock!');
  }
  return res.status(200).json(stock);
};

export default {
  getAllStocks,
  getStockById,
};
