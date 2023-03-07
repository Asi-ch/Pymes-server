import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { ContactDetail, Bill } from ".";
class BillContactDetail extends Model {
  public id!: number;
  public ContactDetailId: ContactDetail;
  public BillId: Bill;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BillContactDetail.init(
  {
    ContactDetailId: {
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

export default BillContactDetail;
