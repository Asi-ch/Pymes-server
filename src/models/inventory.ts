import { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import ProductVariation from './productvariation';


class Inventory extends Model {
  public id!: number;
  public StoreId: string;
  public quantity: number;
  public cost: number;
  public ProductVariations: ProductVariation[]
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventory.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Inventory Name is required.'
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

export default Inventory;