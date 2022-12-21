import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Address, User, Store } from '.';


class Client extends Model {
  public id!: number;
  public StoreId: Store;
  public logoUrl: string;
  public name: string;
  public country: string;
  public email: string;
  public industry: string;
  public uniqueId: string;
  public phoneNumber: number;
  public aliasName: string;
  public vatRegistrationNumber: string;
  public addresses: Address[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Client.init({
  logoUrl: { type: DataTypes.STRING, allowNull: true, },
  name: { type: DataTypes.STRING, allowNull: false },
  country: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  industry: { type: DataTypes.STRING, allowNull: true },
  uniqueId: { type: DataTypes.STRING, allowNull: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: true },
  aliasName: { type: DataTypes.STRING, allowNull: true },
  vatRegistrationNumber: { type: DataTypes.STRING, allowNull: true },
  StoreId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
});



export default Client;