import 'dotenv/config';
import { Dialect } from 'sequelize';

export const CONFIG = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'testdb',
  PASSWORD: process.env.DB_PW || 'testpw',
  DB: process.env.DB_NAME || 'testdb',
  dialect: 'postgres' as Dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

export default CONFIG;
