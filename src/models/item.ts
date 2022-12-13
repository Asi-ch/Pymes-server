import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";

class Item extends Model {
  public id!: number;
  public name!: string;
  public taxRate!: number;
  public quantity!: number;
  public rate: number;
  public total: number;
  public totalTax: number;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Item.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Item name is required"
        }
      }
    },
    taxRate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    totalTax: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
  }
);

export default Item;
