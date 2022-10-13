import Sequelize, { Model, DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import { Store, User } from './';


class Subscription extends Model {
  public id!: number;
  public UserId!: number;
  public stripeSubscriptionId!: string;
  public stripePlanId: string;
  public User: User;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init({
  stripeSubscriptionId: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Stripe Subscription Id is required.'
      },
    }
  },
  stripePlanId: {
    type: DataTypes.STRING,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
});


export default Subscription;