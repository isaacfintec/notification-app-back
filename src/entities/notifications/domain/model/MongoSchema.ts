import { Schema, SchemaTypes, model } from 'mongoose';

import {
  ALL_CATEGORIES,
  ALL_NOTIFICATIONS,
} from '../../../../core/constants/notifications';

import { NotificationMongoModel } from './Model';

const schema = new Schema(
  {
    type: {
      type: SchemaTypes.String,
      enum: ALL_NOTIFICATIONS,
    },
    category: {
      type: SchemaTypes.String,
      enum: ALL_CATEGORIES,
    },
    message: SchemaTypes.String,
    username: SchemaTypes.String,
    time: SchemaTypes.String,
  },
  { timestamps: true },
);

export default model<NotificationMongoModel>('notificationlogs', schema);
