import BaseTrasporter from './Base';

export default class PushTransporter extends BaseTrasporter {
  type: string;

  constructor(porps) {
    super(porps);
    this.type = 'Push';
  }

  sendNotification() {
    /**
     * TODO: send notification by Push notification transporter
     */
    super.logResult();
  }
}
