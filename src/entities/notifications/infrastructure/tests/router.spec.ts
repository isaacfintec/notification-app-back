import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../../app';

import MongoDB from '../../../../core/mongodb';
import { CATEGORIES } from '../../../../core/constants/notifications';
import { NotificationModel } from '../../domain/model/Model';

chai.use(chaiHttp);
const should = chai.should();

describe.only('@Notification/API', () => {
  const mongodb = new MongoDB();
  const message = {
    category: CATEGORIES.Movies,
    message: 'Dune 2 esta por estrenarse en todos los cines de México',
  };

  before(async () => {
    await mongodb.connect();
  });

  after(async () => {
    await mongodb.close();
  });

  it('@SaveMessage:POST: should create many notifications to subscribers', async () => {
    const message = {
      category: CATEGORIES.Movies,
      message: 'Dune 2 esta por estrenarse en todos los cines de México',
    };
    const response = await chai
      .request(app)
      .post('/api/v1/notifications/')
      .send(message);

    response.should.have.status(200);
    response.body.map((n) => {
      const notification = n as { status: string; value: NotificationModel };
      expect(notification.value).to.have.property('category');
      expect(notification.value).to.have.property('message');
      expect(notification.value.category).to.be.equal(message.category);
      expect(notification.value.message).to.be.equal(message.message);
    });
  });

  it('@SaveMessage:POST: should get validation error', async () => {
    const message = {
      category: 'Politica',
      message: 'mensaje para Politica',
    };
    const response = await chai
      .request(app)
      .post('/api/v1/notifications')
      .send(message);

    response.should.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('@SearchMessage:GET: should get all notifications', async () => {
    const response = await chai.request(app).get('/api/v1/notifications/');

    response.should.have.status(200);
    response.body.map((notification: NotificationModel) => {
      expect(notification).to.have.property('category');
      expect(notification).to.have.property('message');
      expect(notification.category).to.be.equal(message.category);
      expect(notification.message).to.be.equal(message.message);
    });
  });

  it('@SearchMessage:GET: should get all notifications for Movies', async () => {
    const response = await chai
      .request(app)
      .get('/api/v1/notifications/?category=Sports');

    response.should.have.status(200);
    response.should.have.status(200);
    response.body.map((notification: NotificationModel) => {
      expect(notification).to.have.property('category');
      expect(notification.category).to.be.equal('Movies');
    });
  });

  it('@SearchMessage:GET: should get empty notifications for Sports', async () => {
    const response = await chai
      .request(app)
      .get('/api/v1/notifications/?category=Sports');

    response.should.have.status(200);
    expect(response.body.length).to.be.equal(0);
  });

  it('@SearchMessage:GET: should get empty notifications for Finance', async () => {
    const response = await chai
      .request(app)
      .get('/api/v1/notifications/?category=Finance');

    response.should.have.status(200);
    expect(response.body.length).to.be.equal(0);
  });
});
