import { expect } from 'chai';

import MongoDB from '../../../../../core/mongodb';
import { NotificationModel } from '../../../domain/model/Model';
import CreateUseCase from '../CreateOne';
import SearchUseCase from '../Search';
import SaveUseCase from '../CreateMany';
import { PartialSearchQuery } from '../../interfaces';

describe('@Notifications/application/useCases', () => {
  const mongodb = new MongoDB();
  const notificationDTO = {
    type: 'SMS',
    category: 'Sports',
    username: 'Paco',
    time: new Date(),
    message: 'Real Madrid gana la copa del rey',
  };

  before(async () => {
    await mongodb.connect();
  });

  after(async () => {
    await mongodb.close();
  });

  it('@CreatehUseCase: should create a notification', async () => {
    const createUseCase = new CreateUseCase();
    const notification = await createUseCase.exec(notificationDTO);
    expect(notification).to.have.property('_id');
    expect(notification).to.have.property('type');
    expect(notification).to.have.property('category');
    expect(notification).to.have.property('message');
    expect(notification).to.have.property('username');
    expect(notification).to.have.property('time');
    expect(notification).to.have.property('createdAt');
    expect(notification).to.have.property('updatedAt');
    expect(notification.type).to.be.equal(notificationDTO.type);
    expect(notification.category).to.be.equal(notificationDTO.category);
    expect(notification.username).to.be.equal(notificationDTO.username);
    expect(notification.time).to.be.equal(notificationDTO.time);
    expect(notification.message).to.be.equal(notificationDTO.message);
  });

  it('@SearchUseCase: should get a notification by query search', async () => {
    const searchUseCase = new SearchUseCase();
    const query = {
      category: notificationDTO.category,
    } as PartialSearchQuery;

    const notifications = await searchUseCase.search(query);
    notifications.map((n) => {
      const notification = n as NotificationModel;
      expect(notification).to.have.property('id');
      expect(notification).to.have.property('type');
      expect(notification).to.have.property('category');
      expect(notification).to.have.property('message');
      expect(notification).to.have.property('username');
      expect(notification).to.have.property('time');
      expect(notification).to.have.property('createdAt');
      expect(notification).to.have.property('updatedAt');
      expect(notification.username).to.be.equal(notificationDTO.username);
    });
  });

  it('@SaveUseCase: should create many notifications from one message', async () => {
    const { category, message } = notificationDTO;
    const saveUseCase = new SaveUseCase();
    const notifications = await saveUseCase.exec({ category, message });
    notifications.map((n) => {
      const notification = n as { status: string; value: NotificationModel };
      expect(notification.value).to.have.property('category');
      expect(notification.value).to.have.property('message');
      expect(notification.value.category).to.be.equal(category);
      expect(notification.value.message).to.be.equal(message);
    });
  });
});
