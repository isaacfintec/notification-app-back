import SQL from './sqldb';
import Mongo from './mongodb';
import { isTestEnvironment } from './utils';

const DB = process.env.DB;

const DBhandlers = {
  mongo: Mongo,
  sql: SQL,
  default: SQL,
};

const DBhandle = DBhandlers[DB] || DBhandlers.default;
const db = new DBhandle();

if (!isTestEnvironment()) db.connect();
