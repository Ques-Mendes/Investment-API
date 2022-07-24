import express from 'express';
import cors from 'cors';
import routers from './routers';
import httpErrorMiddleware from './middlewares/http.error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);
app.use(httpErrorMiddleware);

export default app;
