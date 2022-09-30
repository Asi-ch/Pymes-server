import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../../lib/sequelize';

import bcrypt from 'bcrypt';

class User extends Model {
  public id!: number;
  public email!: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public passwordHash!: string;
  public emailVerified: boolean;
  public fullName: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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