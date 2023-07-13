import { expect } from 'chai';

import MongoDB from '../../../../../core/mongodb';
import SQLDB from '../../../../../core/sqldb';

import Repository from '../Notification';
import { NotificationModel } from '../../model/Model';
import { PartialSearchQuery } from '../../../application/interfaces';

describe('@Notifications/domain/repositories', () => {
  const mongodb = new MongoDB();
  const sqldb = new SQLDB();
  const notificationDTO = {
    type: 'SMS',
    category: 'Sports',
    username: 'Paco',
    time: new Date(),
    message: 'Real Madrid gana la copa del rey',
  };

  before(async () => {
    await mongodb.connect();
    await sqldb.connect();
  });

  after(async () => {
    await mongodb.close();
    await sqldb.close();
  });

  it('@NotificationRepo:Create:Mongo: should create a notification in mongodb', async () => {
    const repository = new Repository();
    const notification = await repository.save(notificationDTO);
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

  it('@NotificationRepo:Create:SQL: should create a notification in sqlitedb', async () => {
    const repository = new Repository('SQL');
    const notification = await repository.save(notificationDTO);
    const target = notification;
    expect(target).to.have.property('id');
    expect(target).to.have.property('type');
    expect(target).to.have.property('category');
    expect(target).to.have.property('message');
    expect(target).to.have.property('username');
    expect(target).to.have.property('time');
    expect(target).to.have.property('createdAt');
    expect(target).to.have.property('updatedAt');
    expect(target.type).to.be.equal(notificationDTO.type);
    expect(target.category).to.be.equal(notificationDTO.category);
    expect(target.username).to.be.equal(notificationDTO.username);
    expect(target.time).to.be.equal(notificationDTO.time);
    expect(target.message).to.be.equal(notificationDTO.message);
  });

  it('@NotificationRepo:Search:Mongo: should search a notifications from mongodb', async () => {
    const repository = new Repository();
    const query = {
      category: notificationDTO.category,
    } as PartialSearchQuery;

    const notifications = await repository.search(query);
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

  it('@NotificationRepo:Search:SQL: should search all notifications from sqlitedb', async () => {
    const repository = new Repository('SQL');
    const query = {
      category: notificationDTO.category,
    } as PartialSearchQuery;

    const notifications = await repository.search(query);
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

  it('@NotificationRepo:Search:Error: should get a empty result', async () => {
    let repository = new Repository('SQL');
    const query = {
      category: 'Politica',
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const notificationsFromSQL = await repository.search(query);
    expect(Array.isArray(notificationsFromSQL)).to.be.true;
    expect(notificationsFromSQL.length).to.be.equal(0);

    repository = new Repository();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const notificationsFromMongo = await repository.search(query);
    expect(Array.isArray(notificationsFromMongo)).to.be.true;
    expect(notificationsFromMongo.length).to.be.equal(0);
  });
});
