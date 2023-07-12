import { CATEGORIES, NOTIFICATIONS } from '../constants/notifications';
import { IUser } from '../../entities/users/domain/model/interface';

export type TCategories = keyof typeof CATEGORIES;
export type TNotifications = keyof typeof NOTIFICATIONS;

export interface NotificationProps {
  message: string;
  notificationType: TNotifications;
}

export interface NotificationLog extends NotificationProps {
  categorie: TCategories;
  user: IUser;
  time: Date;
}

export interface NotificationDTO {
  category: string;
  message: string;
  username: string;
  type: string;
}
