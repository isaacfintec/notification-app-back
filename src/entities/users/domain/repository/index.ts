import UserFactory from '../../application/factories/UseFactory';

const userFactory = new UserFactory();
const mockUsers = userFactory.spam(10);

export default mockUsers;
