import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Client, Store } from './';

class Address extends Model {
  public id!: number;
  public country!: string;
  public city!: string;
  public state!: string;
  public street!: string;
  public zipCode!: string;
  public streetAddress!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init({
  country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },

}, {
  sequelize,
});



export default Address;