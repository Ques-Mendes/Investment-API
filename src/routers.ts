import Router from "express";
import orderController from "./controller/order.controller";
import stocksController from "./controller/stocks.controller";
import usersController from "./controller/users.controller";

const routers = Router();
routers.get('/stocks', stocksController.getAllStocks);
routers.get('/stocks/:id', stocksController.getStockById);

routers.get('/users', usersController.getAllUsers);
routers.get('/users/:id', usersController.getUserById);

routers.get('/orders', orderController.getOrders);

export default routers;