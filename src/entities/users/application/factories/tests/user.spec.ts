import { expect } from 'chai';

import UserFactory from '../UseFactory';

describe('@Users/application/factory', () => {
  it('@UserFactory: should create a user spam', () => {
    const userFactory = new UserFactory();
    const users = userFactory.spam(10);
    users.map((user) => {
      expect(user).to.have.property('id');
      expect(user).to.have.property('name');
      expect(user).to.have.property('email');
      expect(user).to.have.property('phoneNumber');
      expect(user).to.have.property('subscribed');
      expect(user).to.have.property('channels');
      expect(Array.isArray(user.subscribed)).to.be.true;
      expect(Array.isArray(user.channels)).to.be.true;
    });
  });
});
