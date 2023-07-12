import { body, query } from 'express-validator';
import {
  ALL_CATEGORIES,
  ALL_NOTIFICATIONS,
} from '../../../../core/constants/notifications';
import { includes } from '../../../../core/utils';
import { validationMiddleware } from '../../../../core/middlewares';

export const saveV = () => {
  const params = [
    body('category')
      .isString()
      .not()
      .isEmpty()
      .escape()
      .trim()
      .custom(includes(ALL_CATEGORIES)),
    body('message').isString().not().isEmpty().escape().trim(),
  ];

  return [params, validationMiddleware];
};

export const findV = () => {
  const params = [
    query('type')
      .optional()
      .isString()
      .escape()
      .trim()
      .custom(includes(ALL_NOTIFICATIONS)),
    query('category')
      .optional()
      .isString()
      .escape()
      .trim()
      .custom(includes(ALL_CATEGORIES)),
  ];

  return [params, validationMiddleware];
};
