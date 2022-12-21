import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Product, Quotation, User } from '.';


class TransportDetail extends Model {
  public id!: number;
  public challanNumber: string;
  public challanDate: Date;
  public name: string;
  public notes: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TransportDetail.init({
  challanNumber: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  challanDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
});

export default TransportDetail;