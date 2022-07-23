import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const transactionDTO = Joi.object().keys({
  id: Joi.number().required().required(),
  value: Joi.number().min(1).required().required(),
});

const transactionValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { error } = transactionDTO.validate(req.body, { abortEarly: false });  
  if (!error) return next();
  if (error.details[0].message) {
    return res.status(400).json({ message: 'Invalid value!' });
  };
};

export default transactionValidation;