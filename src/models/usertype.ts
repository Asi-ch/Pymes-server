import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';

class UserType extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserType.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name is required.'
      },
    }
  },
}, {
  sequelize,
});


export default UserType;