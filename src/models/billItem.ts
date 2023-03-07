import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { Item, Bill } from ".";
class BillItem extends Model {
  public id!: number;
  public ItemId: Item;
  public BillId: Bill;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BillItem.init(
  {
    ItemId: {
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

export default BillItem;
