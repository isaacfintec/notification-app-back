import { IUser } from '../../../../entities/users/domain/model/interface';
import { TCategories, TNotifications } from '../../../../core/interfaces';

export default interface INotification {
  type: TNotifications;
  message: string;
  category: TCategories;
  username: IUser;
  time: Date;
}
