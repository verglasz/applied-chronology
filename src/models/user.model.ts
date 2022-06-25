import { Sequelize, DataTypes as DT } from 'sequelize';

export default function userModel(sequelize: Sequelize) {
  return sequelize.define('User', {
    username: { type: DT.STRING },
    name: { type: DT.STRING },
    password: { type: DT.STRING },
    uuid: { type: DT.UUID, defaultValue: DT.UUIDV4 },
  });
}
