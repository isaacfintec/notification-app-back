import { expect } from 'chai';

import GetUsersUseCase from '../GetUsers';

describe('@Users/application/useCases', () => {
  it('@GetUsers: should get all user for Sports category', () => {
    const getUsers = new GetUsersUseCase();
    const users = getUsers.exec({ subscription: 'Sports' });

    users.map((user) => {
      expect(user).to.have.property('subscribed');
      expect(user.subscribed.includes('Sports')).to.be.true;
    });
  });

  it('@GetUsers: should get all user for Movies category', () => {
    const getUsers = new GetUsersUseCase();
    const users = getUsers.exec({ subscription: 'Movies' });

    users.map((user) => {
      expect(user).to.have.property('subscribed');
      expect(user.subscribed.includes('Movies')).to.be.true;
    });
  });

  it('@GetUsers: should get all user for Finance category', () => {
    const getUsers = new GetUsersUseCase();
    const users = getUsers.exec({ subscription: 'Finance' });

    users.map((user) => {
      expect(user).to.have.property('subscribed');
      expect(user.subscribed.includes('Finance')).to.be.true;
    });
  });
});
