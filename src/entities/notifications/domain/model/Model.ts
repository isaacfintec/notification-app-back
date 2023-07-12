import { Document } from 'mongoose';
import { Model } from 'sequelize';

export class NotificationMongoModel extends Document {
  type: string;
  category: string;
  message: string;
  username: string;
  time: string;
}

export interface NotificationSQLModel extends Model {
  id: number;
  type: string;
  category: string;
  message: string;
  username: string;
  time: string;
}

export type NotificationModel = NotificationMongoModel | NotificationSQLModel;
