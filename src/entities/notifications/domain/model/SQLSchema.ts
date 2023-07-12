import { Sequelize, DataTypes, ModelDefined, Optional } from 'sequelize';
import { NotificationSQLModel } from './Model';

const sequelize = new Sequelize('sqlite::memory:');

export type NotificationCreateSQLModel = Optional<NotificationSQLModel, 'id'>;

export type SQLModel = ModelDefined<
  NotificationSQLModel,
  NotificationCreateSQLModel
>;

const NotificationsLogs: SQLModel = sequelize.define(
  'Notificationlogs',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    message: DataTypes.STRING,
    username: DataTypes.STRING,
    time: DataTypes.DATE,
  },
  { timestamps: true },
);

export default NotificationsLogs;
