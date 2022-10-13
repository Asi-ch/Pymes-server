import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import bcrypt from 'bcrypt';
import { UserType, Store, Subscription, UserStore } from './';

class User extends Model {
  public id!: number;
  public email!: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public passwordHash!: string;
  public emailVerified: boolean;
  public activeStoreId: number;
  public fullName: string;
  public stores: Store[];
  public activeSubscriptionId: string;
  public stripeCustomerId: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async getAllAdminStores(): Promise<Store[] | null> {
    try {
      const userType = await UserType.findOne({
        where: {
          name: "Admin"
        }
      });
      console.log("User type ===> ", userType, "Id => ", this.id)
      const user = await User.findOne({
        where: {
          id: this.id
        },
        include: [
          {
            attributes: ['id', 'storeName', 'storeDescription', 'createdAt', 'updatedAt'],
            model: Store,
            as: 'stores',
            through: {
              attributes: ['UserId', 'StoreId', 'UserTypeId', 'createdAt', 'updatedAt'],
              where: {
                UserTypeId: userType.id
              }
            },

          },
          Subscription
        ]
      })
      return user.stores

    } catch (error) {
      console.log(error)
      return []
    }
  }
  async getSubscriptions(): Promise<Subscription[] | null> {
    return await Subscription.findAll({
      where: {
        UserId: this.id
      },
    })
  }
  async getActiveAdminStore(): Promise<UserStore | null> {
    if (this.activeStoreId) {
      const userType = await UserType.findOne({
        where: {
          name: "Admin"
        }
      });

      const userStore = await UserStore.findOne({
        where: {
          StoreId: this.activeStoreId,
          UserId: this.id,
          UserTypeId: userType.id
        },
        include: [{ attributes: ['id', 'storeName', 'storeDescription', "createdAt", "updatedAt"], model: Store }]
      })
      return userStore;
    } else {
      return null;
    }
  }

}


User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Email is not valid.'
      },
      notEmpty: {
        msg: 'Email is required.'
      }
    }
  },
  firstName: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: {
        msg: 'First name is required.'
      }
    }
  },
  lastName: {
    type: DataTypes.STRING,
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  },
  password: {
    type: DataTypes.VIRTUAL
  },
  passwordHash: {
    type: DataTypes.STRING
  },
  emailVerified: {
    type: DataTypes.BOOLEAN
  },
  activeStoreId: {
    type: DataTypes.INTEGER
  },
  activeSubscriptionId: {
    type: DataTypes.STRING
  },
  stripeCustomerId: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
});

User.beforeCreate((user, options) => {
  if (user.password) {
    user.passwordHash = bcrypt.hashSync(user.password, 10)
  }
})

User.beforeUpdate((user, options) => {
  if (user.password) {
    user.passwordHash = bcrypt.hashSync(user.password, 10)
  }
})


export default User;