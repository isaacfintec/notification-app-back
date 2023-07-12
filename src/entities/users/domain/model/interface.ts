import { TCategories, TNotifications } from '../../../../core/interfaces';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneNumber: number;
  subscribed: TCategories[];
  channels: TNotifications[];
}
