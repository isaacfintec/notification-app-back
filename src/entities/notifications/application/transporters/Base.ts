import { NotificationDTO } from '../../../../core/interfaces';
import { NotificationModel } from '../../domain/model/Model';
import CreateNotificationUseCase from '../useCases/CreateLog';

export default abstract class BaseTrasporter {
  props: NotificationDTO;

  constructor(notificationDTO: NotificationDTO) {
    this.props = notificationDTO;
  }

  abstract sendNotification();

  async logResult(): Promise<NotificationModel> {
    const self = this;
    const createNotificationUseCase = new CreateNotificationUseCase();
    const notificationLog = await createNotificationUseCase.exec(self.props);
    return notificationLog;
  }
}
