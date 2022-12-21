import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Address, Quotation } from '.';
class QuotationShippedFrom extends Model {
  public id!: number;
  public AddressId: Address;
  public QuotationId: Quotation;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuotationShippedFrom.init({
  AddressId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  QuotationId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
});



export default QuotationShippedFrom;