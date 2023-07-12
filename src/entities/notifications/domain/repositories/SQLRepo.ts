import SQLSchema from '../model/SQLSchema';
import { NotificationDTO } from '../../../../core/interfaces';
import { NotificationSQLModel } from '../model/Model';
import { PartialSearchQuery } from '../../application/interfaces';

export default class SQLRepository {
  async save(notificationDTO: NotificationDTO): Promise<NotificationSQLModel> {
    const notificationlog = await SQLSchema.create(notificationDTO);
    return notificationlog.dataValues;
  }

  async search(query?: PartialSearchQuery): Promise<NotificationSQLModel[]> {
    const notification = await SQLSchema.findAll({ where: query || {} });
    return notification.map((v) => v.dataValues);
  }
}
