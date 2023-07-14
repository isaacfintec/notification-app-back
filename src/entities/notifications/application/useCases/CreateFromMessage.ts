import { IUser } from 'src/entities/users/domain/model/interface';
import { NotificationDTO, NotificationMss } from '../../../../core/interfaces';
import GetUsersUseCase from '../../../users/application/useCases/GetUsers';
import NotificationFactory from '../factories/Notification';

interface Response {
  status: number;
  message: string;
}

export default class CreateFromMessage {
  callUsers(category): IUser[] {
    const getUsers = new GetUsersUseCase();
    const users = getUsers.exec({ subscription: category });
    return users;
  }

  getNotifications(notificationMss: NotificationMss): NotificationDTO[] {
    const self = this;
    const notifications = [];
    const users = self.callUsers(notificationMss.category);
    users.map((user) => {
      user.channels.map((channel) => {
        const notificationDTO = {
          type: channel,
          username: user.name,
          time: new Date(),
          ...notificationMss,
        };
        notifications.push(notificationDTO);
      });
    });
    return notifications;
  }

  async sendNotifications(notifications: NotificationDTO[]) {
    const promises = notifications.map(async (notificationDTO) => {
      const trasporter = NotificationFactory.createTransporter(notificationDTO);
      await trasporter.sendNotification();
      return trasporter.logResult();
    });
    const result = await Promise.allSettled(promises);
    return result;
  }

  async exec(notificationMss: NotificationMss) {
    const self = this;
    const notifications = await self.getNotifications(notificationMss);
    const data = await self.sendNotifications(notifications);
    return data;
  }
}
