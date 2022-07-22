import Router from "express";
import orderController from "./controller/order.controller";
import stocksController from "./controller/stocks.controller";
import usersController from "./controller/users.controller";
import orderValidaton from "./middlewares/order.validation";

const routers = Router();

routers.post('/users', usersController.newUser);
routers.get('/users', usersController.getAllUsers);
routers.get('/users/:id', usersController.getUserById);
routers.get('/user/orders/:id', orderController.getUserStocks);

routers.get('/stocks', stocksController.getAllStocks);
routers.get('/stocks/:id', stocksController.getStockById);

routers.post('/orders/buy', orderValidaton, orderController.createNewOrder);
routers.post('/orders/sell', orderValidaton, orderController.sellOrder);


export default routers;
