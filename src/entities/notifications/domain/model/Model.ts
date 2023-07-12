import { Document } from 'mongoose';
import { Model } from 'sequelize';

export class NotificationMongoModel extends Document {
  type: string;
  category: string;
  message: string;
  username: string;
  time: Date;
}

export interface NotificationSQLModel extends Model {
  id: number;
  type: string;
  category: string;
  message: string;
  username: string;
  time: Date;
}

export type NotificationModel = NotificationMongoModel | NotificationSQLModel;
