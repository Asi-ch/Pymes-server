import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { ContactDetail, Quotation } from '.';
class QuotationContactDetail extends Model {
  public id!: number;
  public ContactDetailId: ContactDetail;
  public QuotationId: Quotation;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuotationContactDetail.init({
  ContactDetailId: {
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



export default QuotationContactDetail;