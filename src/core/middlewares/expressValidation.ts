import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import HTTP_CODE from 'http-status-codes';

class InvalidParameterError extends Error {
  code: string;

  constructor(name) {
    super();
    this.code = 'INVALID_PARAMETER';
    this.message = `Parameter "${name}" is invalid`;
  }
}

const formatErrors = (errors: ValidationError[]) => {
  const newErros = [...errors].map((error) => {
    const { param, value } = error;
    const lastPram = param.split('.').pop();
    const message = `${lastPram}: ${value}`;
    return new InvalidParameterError(message);
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
    const formatedErrors = formatErrors(errors.array());
    return res.status(HTTP_CODE.BAD_REQUEST).json({ errors: formatedErrors });
  }
  return next();
};
