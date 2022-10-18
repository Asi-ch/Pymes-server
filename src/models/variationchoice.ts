import { Model, DataTypes } from 'sequelize';
import { VariationDimension } from '.';
import sequelize from '../lib/sequelize';


class VariationChoice extends Model {
  public id!: number;
  public choice!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VariationChoice.init({
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

export default VariationChoice;