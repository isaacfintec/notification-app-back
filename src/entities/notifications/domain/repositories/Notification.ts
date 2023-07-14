import MongoRepo from './MongoAdapter';
import SQLRepo from './SQLAdapter';
import { NotificationDTO } from '../../../../core/interfaces/Notifications';
import { PartialSearchQuery } from '../../application/interfaces';
import { NotificationModel } from '../model/Model';

export default class Repository {
  store: SQLRepo | MongoRepo;

  constructor(db?: string) {
    this.store = this.selectAdapter(db);
  }

  private selectAdapter(db: string) {
    const dbSelector = db || process.env.DB;

    const dbByConfig = {
      mongo: MongoRepo,
      sql: SQLRepo,
      default: MongoRepo,
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
