import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import HTTP_CODE from 'http-status-codes';

import { CustomError } from '../helpers';

const errorFormatter = (errors: ValidationError[]) => {
  const code = 'INVALID_PARAMETER';
  const newErros = errors.map((error) => {
    const { param, value } = error;
    const lastPram = param.split('.').pop();
    const message = `${lastPram}: ${value}`;
    return new CustomError(code, message);
  });
  return newErros;
};

export const validationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errorFormatter(errors.array());
    return res.status(HTTP_CODE.BAD_REQUEST).json({ errors: formattedErrors });
  }
  return next();
};
