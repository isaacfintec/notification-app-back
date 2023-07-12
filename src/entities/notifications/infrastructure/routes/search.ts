import { searchCtrllr } from '../controllers';
import { findV } from './validators';

const searchValidator = findV();

const routes = [
  {
    path: '/',
    method: 'get',
    handlers: [searchValidator, searchCtrllr],
  },
];

export default routes;
