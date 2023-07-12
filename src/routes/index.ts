import path from 'path';
import { Router } from 'express';
import apiRoutes from './api';
import { cleanReqInputs } from '../core/helpers';

const router = Router();

router.use(/^\/(?!api).*/, (req, res) => {
  const indexPath = path.join(process.cwd(), 'public', 'index.html');
  res.sendFile(indexPath);
});

router.use('/api/v1', cleanReqInputs, apiRoutes);

export default router;
