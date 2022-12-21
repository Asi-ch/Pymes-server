import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Item, Invoice } from '.';
class InvoiceItem extends Model {
  public id!: number;
  public ItemId: Item;
  public InvoiceId: Invoice;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InvoiceItem.init({
  ItemId: {
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



export default InvoiceItem;