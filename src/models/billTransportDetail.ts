import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { Bill, TransportDetail } from ".";
class BillTransportDetail extends Model {
  public id!: number;
  public TransportDetailId: TransportDetail;
  public BillId: Bill;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BillTransportDetail.init(
  {
    TransportDetailId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BillId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

export default BillTransportDetail;
