import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { Address, Bill } from ".";
class BillShippedTo extends Model {
  public id!: number;
  public AddressId: Address;
  public BillId: Bill;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BillShippedTo.init(
  {
    AddressId: {
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

export default BillShippedTo;
