import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { ContactDetail, Invoice } from '.';
class InvoiceContactDetail extends Model {
  public id!: number;
  public ContactDetailId: ContactDetail;
  public InvoiceId: Invoice;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InvoiceContactDetail.init({
  ContactDetailId: {
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



export default InvoiceContactDetail;