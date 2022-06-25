import { Dialect } from 'sequelize';

export const CONFIG = {
  HOST: 'localhost',
  USER: 'testdb',
  PASSWORD: 'testpw',
  DB: 'testdb',
  dialect: 'postgres' as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default CONFIG;
