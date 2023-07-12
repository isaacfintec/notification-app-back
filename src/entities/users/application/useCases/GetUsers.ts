import lodash from 'lodash';

import { QueryForUsers } from '../interface';
import { IUser } from '../../domain/model/interface';
import usersMock from '../../domain/repositories';

export default class GetUsers {
  getUsers(query: QueryForUsers) {
    const usersMatch = lodash.filter(usersMock, (user: IUser) => {
      return user.subscribed.includes(query.subscription);
    });
    return usersMatch;
  }

  exec(query: QueryForUsers): IUser[] {
    const users = this.getUsers(query);
    return users;
  }
}
