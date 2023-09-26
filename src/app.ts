import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import './core/config';
import helmet from 'helmet';
import cors from 'cors';

import { isProductionEnvironment, isTestEnvironment } from './core/utils';
import appErrorshandler from './core/appErrorsHandler';
import corsOptionsDelegate from './core/helpers/corsOptionsDelegate';
import routes from './routes';
import './core/db';

const app = express();
const logType = isProductionEnvironment() ? 'combined' : 'dev';

app.use(logger(logType));
app.use(helmet());
app.use(cors({
  origins: ['http://localhost:3000', 'http://localhost:8000'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/', routes);
app.use(appErrorshandler);

export default app;
