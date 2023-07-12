import lodash from 'lodash';

import { QueryForUsers } from '../interface';
import { IUser } from '../../domain/model/interface';
import users from '../../domain/repository';

export default class GetUsers {
  getUsers(query: QueryForUsers) {
    const usersMatch = lodash.filter(users, (user: IUser) => {
      return user.subscribed.includes(query.subscription);
    });
    return usersMatch;
  }

  exec(query: QueryForUsers): IUser[] {
    const users = this.getUsers(query);
    return users;
  }
}
