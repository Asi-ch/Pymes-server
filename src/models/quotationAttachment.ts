import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Attachment, Quotation } from '.';
class QuotationAttachment extends Model {
  public id!: number;
  public AttachmentId: Attachment;
  public QuotationId: Quotation;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuotationAttachment.init({
  AttachmentId: {
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



export default QuotationAttachment;