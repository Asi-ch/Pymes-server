import { DataTypes, Model } from "sequelize";
import sequelize from "../lib/sequelize";
import { Product } from "./";

class ProductVariation extends Model {
  public id!: number;
  public ProductId!: Product;
  public size!: string;
  public color!: string;
  public cost!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductVariation.init(
  {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

export default ProductVariation;
