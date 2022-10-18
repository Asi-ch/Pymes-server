import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Inventory, User } from '.';


class Store extends Model {
  public id!: number;
  public name!: string;
  public description: string;
  public location: string;
  public users: User[];
  public inventory: Inventory[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Store.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Store Name is required.'
      },
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
});

export default Store;