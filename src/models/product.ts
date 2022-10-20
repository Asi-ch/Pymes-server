import { Model, DataTypes } from 'sequelize';
import { ProductVariation, Store } from '.';
import sequelize from '../lib/sequelize';


class Product extends Model {
  public id!: number;
  public name!: string;
  public description: string;
  public productVariations: ProductVariation[];
  public StoreId: Store;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Product Name is required.'
      },
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StoreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
});

export default Product;