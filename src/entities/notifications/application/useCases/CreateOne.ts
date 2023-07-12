import { NotificationDTO } from '../../../../core/interfaces';
import { NotificationModel } from '../../domain/model/Model';
import Repository from '../../domain/repositories/Notification';

export default class CreateNotificationUseCase {
  async create(
    notificationDTO: NotificationDTO,
  ): Promise<NotificationModel> | never {
    const repository = new Repository();
    const notification = await repository.save(notificationDTO);
    return notification;
  }

  async exec(
    notificationDTO: NotificationDTO,
  ): Promise<NotificationModel> | never {
    const self = this;
    const norificationLogs = await self.create(notificationDTO);
    /**
     * TODO: call webhook when notificationLog has been saved
     * await self.execWebhook(norifications)
     */
    return norificationLogs;
  }
}
