import {
  Sequelize,
  Deferrable,
  DataTypes as DT,
  Model,
  ModelCtor,
} from 'sequelize';

export default function interviewModel(
  sequelize: Sequelize,
  Application: ModelCtor<Model>
) {
  return sequelize.define('Interview', {
    applicationId: {
      type: DT.INTEGER,
      references: {
        model: Application,
        key: 'id', // use autogenerated id column as FK
        deferrable:
          Deferrable.INITIALLY_DEFERRED as unknown as Deferrable.Deferrable,
        // it seems the type definitions in Sequelize don't match the desired usage,
        // ideally we'd remove the cast
      },
    },
    date: { type: DT.DATE },
    notes: { type: DT.TEXT },
    uuid: { type: DT.UUID, defaultValue: DT.UUIDV4 },
  });
}
