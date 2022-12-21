import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Product, Store, User } from '.';
import { StoreTypeEnum } from '../lib/types';


class StoreProfile extends Model {
  public id!: number;
  public StoreId: Store;
  public businessType: StoreTypeEnum;
  public profileUrl: string;
  public businessStartDate: Date;
  public tagLine: string;
  public information: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StoreProfile.init({
  businessType: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: [StoreTypeEnum.INDIVIDUAL, StoreTypeEnum.TEAM],
    defaultValue: StoreTypeEnum.INDIVIDUAL
  },
  profileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  businessStartDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tagLine: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  information: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
});

export default StoreProfile;