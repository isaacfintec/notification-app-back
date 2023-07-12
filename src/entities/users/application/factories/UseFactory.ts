import lodash from 'lodash';
import { faker } from '@faker-js/faker';

import { IUser } from '../../domain/model/interface';
import { TCategories, TNotifications } from '../../../../core/interfaces';
import {
  ALL_CATEGORIES,
  ALL_NOTIFICATIONS,
} from '../../../../core/constants/notifications';
import { createArrayOfMockData } from '../../../../core/utils';
import UserBuilder from './UserBuilder';

export default class UserFactory {
  private createUser(props?: Partial<IUser>) {
    const { name, email, phoneNumber, subscribed, channels } = props || {};

    const userBuilder = new UserBuilder(props);

    userBuilder
      .withId()
      .withName(name || faker.internet.userName())
      .withEmail(email || faker.internet.email())
      .withPhoneNumber(phoneNumber || +faker.phone.number('33########'))
      .withSubscriptions(subscribed || mockSubscription())
      .withChannels(channels || mockChannels());

    return userBuilder.build();
  }

  spam(cant?: number) {
    const self = this;
    return createArrayOfMockData<IUser>(cant || 1, self.createUser);
  }
}

function mockSubscription(salt?: number): TCategories[] {
  return createArrayOfMockData<TCategories>(salt || 1, () =>
    lodash.sample(ALL_CATEGORIES),
  );
}

function mockChannels(salt?: number): TNotifications[] {
  return createArrayOfMockData<TNotifications>(salt || 1, () =>
    lodash.sample(ALL_NOTIFICATIONS),
  );
}
