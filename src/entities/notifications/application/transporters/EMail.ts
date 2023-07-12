import BaseTrasporter from './Base';

export default class EMailTransporter extends BaseTrasporter {
  type: string;

  constructor(porps) {
    super(porps);
    this.type = 'EMail';
  }

  sendNotification() {
    /**
     * TODO: send notification by email transporter
     */
    super.logResult();
  }
}
