import { NextFunction, Request, Response } from "express";
import HttpException from "../helpers/http.exception";
import { authenticateToken } from "../helpers/JWT";

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization;
  const user = await authenticateToken(token);
  if (!user) {
    throw new HttpException(401, 'Unauthorized');    
  }
  res.locals.user = user;
  next();
};

export default authMiddleware;