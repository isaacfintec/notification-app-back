import { Types } from 'mongoose';
import { IUser } from '../../domain/model/interface';
import { TCategories, TNotifications } from '../../../../core/interfaces';

export default class UserBuilder {
  baseUser: IUser;
  user: IUser;

  constructor(user?: Partial<IUser>) {
    this.baseUser = {
      id: '',
      name: '',
      email: '',
      phoneNumber: 0,
      subscribed: [],
      channels: [],
    };

    this.user = {
      ...this.baseUser,
      ...user,
    };
  }

  withId(id?: string) {
    this.user.id = id || new Types.ObjectId().toString();
    return this;
  }

  withName(name: string) {
    this.user.name = name;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withPhoneNumber(phoneNumber: number) {
    this.user.phoneNumber = phoneNumber;
    return this;
  }

  withSubscriptions(subscriptions: TCategories[]) {
    this.user.subscribed = subscriptions;
    return this;
  }

  withChannels(channels: TNotifications[]) {
    this.user.channels = channels;
    return this;
  }

  reset() {
    this.user = { ...this.baseUser };
    return this;
  }

  build(): IUser {
    const user = { ...this.user };
    this.reset();
    return user;
  }
}
