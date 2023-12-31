import { Sequelize } from 'sequelize';

import Notificationslogs from '../entities/notifications/domain/model/SQLSchema';

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

class SQL {
  async connect() {
    try {
      const db = await sequelize.authenticate();
      console.log(`SQLite successfully connected!`);
      await Notificationslogs.sync();
      console.log(`Notificationslogs table created`);
      return db;
    } catch (error) {
      console.error('Unable to connect to SQLite database:', error);
    }
  }

  async close() {
    await sequelize.close();
  }
}

export default SQL;
