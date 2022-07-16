import express from 'express';
import routers from './routers';
import httpErrorMiddleware from './middlewares/http.error.middleware';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(routers);
app.use(httpErrorMiddleware);

export default app;
