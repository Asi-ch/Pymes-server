import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Address, Invoice } from '.';
class InvoiceShippedFrom extends Model {
  public id!: number;
  public AddressId: Address;
  public InvoiceId: Invoice;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InvoiceShippedFrom.init({
  AddressId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  InvoiceId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
});



export default InvoiceShippedFrom;