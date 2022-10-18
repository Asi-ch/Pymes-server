import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Product } from './';

class ProductVariation extends Model {
  public id!: number;
  public ProductId!: number;
  public VariationChoiceId!: number;
  public VariationDimensionId!: number;
  public InventoryId!: number;
  public value: string;
  public products: Product[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductVariation.init({
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  StoreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  UserTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
});


export default ProductVariation;