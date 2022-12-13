import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Address, Store } from './';
class StoreAddress extends Model {
  public id!: number;
  public AddressId: Address;
  public StoreId: Store;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StoreAddress.init({
  AddressId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  StoreId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
});



export default StoreAddress;