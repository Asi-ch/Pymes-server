import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { VariationChoice } from '.';


class Product extends Model {
  public id!: number;
  public name!: string;
  public description: string;
  public variation_choices: VariationChoice[];
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
}, {
  sequelize,
});

export default Product;