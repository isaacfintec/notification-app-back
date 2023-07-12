import BaseTrasporter from './Base';

export default class SMSTransporter extends BaseTrasporter {
  type: string;

  constructor(porps) {
    super(porps);

    this.type = 'SMS';
  }

  sendNotification() {
    /**
     * TODO: send notification by Push notification transporter
     */
    super.logResult();
  }
}
