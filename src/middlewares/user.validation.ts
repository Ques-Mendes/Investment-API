import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

const userDTO = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  balance: Joi.number().required(),
});

const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userDTO.validate(req.body, { abortEarly: false });
  if (!error) return next();
  if (error.details[0].message) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default userValidation;
