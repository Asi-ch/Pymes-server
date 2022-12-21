import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Client, Store } from './';

class ContactDetail extends Model {
  public id!: number;
  public email!: string;
  public phoneNumber!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ContactDetail.init({
  email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
});



export default ContactDetail;