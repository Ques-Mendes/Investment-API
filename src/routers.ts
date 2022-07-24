import Router from 'express';
import orderController from './controller/order.controller';
import stocksController from './controller/stocks.controller';
import usersController from './controller/users.controller';
import transactionValidation from './middlewares/transaction.validation';
import orderValidaton from './middlewares/order.validation';
import authMiddleware from './middlewares/auth.middleware';
import userValidation from './middlewares/user.validation';
import loginController from './controller/login.controller';
import loginValidation from './middlewares/login.validation';

const routers = Router();
routers.post('/login', loginValidation, loginController.login);

routers.post('/users', userValidation, usersController.newUser);
routers.get('/users', authMiddleware, usersController.getAllUsers);
routers.get('/users/:id', authMiddleware, usersController.getUserById);
routers.get('/user/orders/:id', authMiddleware, orderController.getUserStocks);

routers.get('/stocks', authMiddleware, stocksController.getAllStocks);
routers.get('/stocks/:id', authMiddleware, stocksController.getStockById);

routers.post('/orders/buy', authMiddleware, orderValidaton, orderController.createNewOrder);
routers.post('/orders/sell', authMiddleware, orderValidaton, orderController.sellOrder);

routers.post('/account/deposit', transactionValidation, usersController.updateUserBalance);
routers.post('/account/withdraw', authMiddleware, transactionValidation, usersController.withdrawBalance);

export default routers;
