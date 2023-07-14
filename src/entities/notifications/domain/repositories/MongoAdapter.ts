import MongoSchema from '../model/MongoSchema';
import { NotificationDTO } from '../../../../core/interfaces';
import { NotificationMongoModel } from '../model/Model';
import { PartialSearchQuery } from '../../application/interfaces/index';

export default class MongoRepository {
  save(notificationDTO: NotificationDTO): Promise<NotificationMongoModel> {
    const notification = new MongoSchema(notificationDTO);
    return notification.save();
  }

  async search(query?: PartialSearchQuery): Promise<NotificationMongoModel[]> {
    const notification = await MongoSchema.find(query || {})
      .sort({ time: -1 })
      .exec();
    return notification;
  }
}
