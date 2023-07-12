import { NOTIFICATIONS } from '../../../../core/constants/notifications';
import { NotificationDTO } from '../../../../core/interfaces';

import {
  BaseTrasporter,
  EMailTrasporter,
  PushTrasporter,
  SMSTrasporter,
} from '../transporters';

export default class NotificationFactory {
  createTransporter(notificationDTO: NotificationDTO): BaseTrasporter {
    const { type } = notificationDTO;

    const transporteByType = {
      [NOTIFICATIONS.EMail]: EMailTrasporter,
      [NOTIFICATIONS.SMS]: SMSTrasporter,
      [NOTIFICATIONS.Push]: PushTrasporter,
      default: null,
    };

    const Transporter = transporteByType[type] || transporteByType.default;
    if (!Transporter) throw new Error('Unable to create a transporter');

    return new Transporter(notificationDTO);
  }
}
