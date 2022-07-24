import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const orderDTO = Joi.object().keys({
  userId: Joi.number().required().required(),
  stocksId: Joi.number().required().required(),
  quantity: Joi.number().required().required(),
});

const orderValidaton = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = orderDTO.validate(req.body, { abortEarly: false });
  if (!error) return next();
  if (error.details[0].message) {
    return res.status(400).json({ message: 'Bad Request!' });
  }
};

export default orderValidaton;
