import Router from "express";
import stocksController from "./controller/stocks.controller";

const routers = Router();
routers.use('/stocks', stocksController.getAllStocks);

export default routers;