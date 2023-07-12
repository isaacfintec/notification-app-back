import { saveCtrllr } from '../controllers';
import { saveV } from './validators';

const saveValidator = saveV();

const routes = [
  {
    path: '/',
    method: 'post',
    handlers: [saveValidator, saveCtrllr],
  },
];

export default routes;
