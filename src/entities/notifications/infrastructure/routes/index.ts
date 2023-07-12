/* eslint-disable no-restricted-syntax */
import RoutesGen from '../../../../core/helpers/RoutesGenerator';
import saveRoute from './save';
import searchRoute from './search';

const routes = [...saveRoute, ...searchRoute];

const router = RoutesGen.generateRoutes(routes);

export default router;
