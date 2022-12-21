import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Address, Client } from './';
class ClientAddress extends Model {
  public id!: number;
  public AddressId: Address;
  public ClientId: Client;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClientAddress.init({
  AddressId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ClientId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  sequelize,
});



export default ClientAddress;