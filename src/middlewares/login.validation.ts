import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const loginDTO = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = loginDTO.validate(req.body, { abortEarly: false });
  if (!error) return next();
  if (error.details[0].message) {
    return res.status(401).json({ message: 'Invalid data' });
  }
};

export default loginValidation;
