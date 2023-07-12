import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import './core/config';
import helmet from 'helmet';

import { isProductionEnvironment } from './core/utils';
import appErrorshandler from './core/appErrorsHandler';
import routes from './routes';

const app = express();
const logType = isProductionEnvironment() ? 'combined' : 'dev';

app.use(logger(logType));
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/', routes);
app.use(appErrorshandler);

export default app;
