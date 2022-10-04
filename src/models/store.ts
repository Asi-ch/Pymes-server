import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { User } from '.';


class Store extends Model {
  public id!: number;
  public storeName!: string;
  public storeDescription: string;
  public users: User[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Store.init({
  storeName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Store Name is required.'
      },
    }
  },
  storeDescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
});

export default Store;