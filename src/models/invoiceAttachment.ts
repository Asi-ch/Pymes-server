import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Attachment, Invoice } from '.';
class InvoiceAttachment extends Model {
  public id!: number;
  public AttachmentId: Attachment;
  public InvoiceId: Invoice;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InvoiceAttachment.init({
  AttachmentId: {
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



export default InvoiceAttachment;