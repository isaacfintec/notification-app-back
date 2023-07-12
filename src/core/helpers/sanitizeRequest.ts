import cleanInjectionAttacks from 'mongo-sanitize';

import { TExpressHandler } from '../interfaces';

export const cleanReqInputs: TExpressHandler = (req, reply, next) => {
  try {
    if (req.body) req.body = cleanInjectionAttacks(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
