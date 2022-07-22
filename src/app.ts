import express from 'express';
import routers from './routers';
import cors from 'cors';
import httpErrorMiddleware from './middlewares/http.error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);
app.use(httpErrorMiddleware);

export default app;
