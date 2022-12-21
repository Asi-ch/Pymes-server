import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Client, Store } from './';

class Attachment extends Model {
  public id!: number;
  public url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Attachment.init({
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
});



export default Attachment;