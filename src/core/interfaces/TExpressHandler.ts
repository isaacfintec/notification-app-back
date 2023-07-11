import { Response, NextFunction } from 'express';
import { IRequest } from './Request';

export interface AddressInfo {
  address: string;
  family: string;
  port: number;
}

export type Address = AddressInfo | string | null;

export type TExpressHandler = (
  req: IRequest,
  reply: Response,
  next: NextFunction
) => void | never;
