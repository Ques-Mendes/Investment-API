import Router from "express";
import stocksController from "./controller/stocks.controller";
import usersController from "./controller/users.controller";

const routers = Router();
routers.get('/stocks', stocksController.getAllStocks);
routers.get('/stocks/:id', stocksController.getStockById);

routers.get('/users', usersController.getAllUsers);

export default routers;