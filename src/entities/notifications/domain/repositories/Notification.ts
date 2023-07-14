import MongoRepo from './MongoRepo';
import SQLRepo from './SQLRepo';
import { NotificationDTO } from '../../../../core/interfaces/Notifications';
import { PartialSearchQuery } from '../../application/interfaces';
import { NotificationModel } from '../model/Model';

export default class Repository {
  store: SQLRepo | MongoRepo;

  constructor(db?: string) {
    this.store = this.getDBStrategy(db);
  }

  private getDBStrategy(db: string) {
    const dbSelector = db || process.env.DB;

    const dbByConfig = {
      mongo: MongoRepo,
      sql: SQLRepo,
      default: SQLRepo,
    };

    const DBhandle = dbByConfig[dbSelector] || dbByConfig.default;
    return new DBhandle();
  }

  async save(notificationDTO: NotificationDTO): Promise<NotificationModel> {
    const self = this;
    const notification = await self.store.save(notificationDTO);
    return notification;
  }

  async search(query?: PartialSearchQuery): Promise<NotificationModel[]> {
    const self = this;
    const notification = await self.store.search(query);
    return notification;
  }
}
