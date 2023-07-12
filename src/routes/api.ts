import { Router } from 'express';

import notificationsRoutes from '../entities/notifications/infrastructure/routes';

const router = Router();

router.use('/notifications', notificationsRoutes);

export default router;
