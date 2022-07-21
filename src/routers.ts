import Router from "express";
// import * as buyingController from "./controller/buying.controller";
import orderController from "./controller/order.controller";
import stocksController from "./controller/stocks.controller";
import usersController from "./controller/users.controller";

const routers = Router();

routers.get('/stocks', stocksController.getAllStocks);
routers.get('/users', usersController.getAllUsers);
routers.get('/users/:id', usersController.getUserById);

routers.get('/stocks/:id', stocksController.getStockById);
routers.get('/user/orders/:id', orderController.getUserStocks);

routers.post('/orders', orderController.createOrder);

export default routers;
