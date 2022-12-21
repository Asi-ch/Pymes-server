import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Quotation, TransportDetail } from '.';
class QuotationTransportDetail extends Model {
  public id!: number;
  public TransportDetailId: TransportDetail;
  public QuotationId: Quotation;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QuotationTransportDetail.init({
  TransportDetailId: {
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



export default QuotationTransportDetail;