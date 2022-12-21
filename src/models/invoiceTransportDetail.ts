import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Invoice, TransportDetail } from '.';
class InvoiceTransportDetail extends Model {
  public id!: number;
  public TransportDetailId: TransportDetail;
  public InvoiceId: Invoice;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InvoiceTransportDetail.init({
  TransportDetailId: {
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



export default InvoiceTransportDetail;