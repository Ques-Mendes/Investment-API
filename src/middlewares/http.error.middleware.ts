import { NextFunction, Request, Response } from 'express';
import HttpException from '../helpers/http.exception';

const httpErrorMiddleware = (error: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = error as HttpException;
  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;