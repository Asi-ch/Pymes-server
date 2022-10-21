import { Model, DataTypes } from 'sequelize';
import { Category, ProductVariation, Store } from '.';
import sequelize from '../lib/sequelize';


class Product extends Model {
  public id!: number;
  public name!: string;
  public description: string;
  public productVariations: ProductVariation[];
  public StoreId: Store;
  public CategoryId: Category;
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
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  sequelize,
});

export default Product;