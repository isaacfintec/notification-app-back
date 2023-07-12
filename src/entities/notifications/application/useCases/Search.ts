import { NotificationModel } from '../../domain/model/Model';
import { PartialSearchQuery } from '../interfaces';
import Repository from '../../domain/repositories/Notification';

export default class SearchNotificationUseCase {
  search(query: PartialSearchQuery): Promise<NotificationModel[]> | never {
    const repository = new Repository();
    return repository.search(query);
  }

  async exec(query: PartialSearchQuery): Promise<NotificationModel[]> | never {
    const self = this;
    const notifications = await self.search(query);
    /**
     * TODO: Hidrate notifications whit some info from other collection o table
     * const notificationsHidrated = await self.hidrateNotifications(norifications)
     * return notificationsHidrated;
     */
    return notifications;
  }
}
