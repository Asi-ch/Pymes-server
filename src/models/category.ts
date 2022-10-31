import { DataTypes, Model } from "sequelize";
import { Store } from ".";
import sequelize from "../lib/sequelize";
import Product from "./product";

class Category extends Model {
  public id!: number;
  public name!: string;
  public products: Product[];
  public StoreId: Store;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Product Name is required.'
      },
    }
  },
  StoreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize
});
export default Category