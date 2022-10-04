import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Store, User, UserType } from './';

class UserStore extends Model {
  public id!: number;
  public UserId!: number;
  public StoreId!: number;
  public UserTypeId!: number;
  public UserType: UserType;
  public Store: Store;
  public User: User;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserStore.init({
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


export default UserStore;