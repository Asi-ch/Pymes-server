import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import Product from './product';
import VariationChoice from './variationchoice';


class VariationDimension extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VariationDimension.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Product Name is required.'
      },
    }
  },
}, {
  sequelize,
});

export default VariationDimension;