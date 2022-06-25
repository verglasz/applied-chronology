import dbConfig from '../config/db.config';
import { Sequelize } from 'sequelize';

import userModel from './user.model';
import applicationModel from './application.model';
import interviewModel from './interview.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const User = userModel(sequelize);
const Application = applicationModel(sequelize, User);
const Interview = interviewModel(sequelize, Application);

User.hasMany(Application, { foreignKey: 'userId' });
Application.belongsTo(User, { foreignKey: 'userId' });
Application.hasMany(Interview, { foreignKey: 'applicationId' });
Interview.belongsTo(Application, { foreignKey: 'applicationId' });

const db = {
  sequelize,
  users: User,
  applications: Application,
  interviews: Interview,
};

export default db;
