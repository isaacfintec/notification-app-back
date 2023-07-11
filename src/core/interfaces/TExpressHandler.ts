import { Response, NextFunction } from 'express';
import { IRequest } from './Request';

export type TExpressHandler = (
  req: IRequest,
  reply: Response,
  next: NextFunction
) => void | never;
