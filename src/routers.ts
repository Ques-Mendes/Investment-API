import Router from "express";
import stocksController from "./controller/stocks.controller";

const routers = Router();
routers.use('/stocks', stocksController.getAllStocks);
routers.use('/stocks/:id', stocksController.getStockById);

export default routers;