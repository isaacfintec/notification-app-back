import { expect } from 'chai';

import MongoDB from '../../../../../core/mongodb';
import CreateUseCase from '../Create';

describe('@Notifications/application/useCases', () => {
  const mongodb = new MongoDB();
  const notificationDTO = {
    type: 'SMS',
    category: 'Sports',
    username: 'Paco',
    time: new Date().toISOString(),
    message: 'Real Madrid gana la copa del rey',
  };

  before(async () => {
    await mongodb.connect();
  });

  after(async () => {
    await mongodb.close();
  });

  it('@CreateUseCase: should create a notification', async () => {
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
    expect(notification.time.toISOString()).to.be.equal(notificationDTO.time);
    expect(notification.message).to.be.equal(notificationDTO.message);
  });
});
