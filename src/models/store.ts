import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { Product, User } from ".";

class Store extends Model {
  public id!: number;
  public name!: string;
  public description: string;
  public location: string;
  public users: User[];
  public vatNumber: string;
  public products: Product[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Store.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Store Name is required.",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vatNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default Store;
