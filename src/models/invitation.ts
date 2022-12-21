import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";

class Invitation extends Model {
  public id!: number;
  public inviteEmail!: string;
  public UserId!: number;
  public StoreId!: number;
  public status: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Invitation.init(
  {
    inviteEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invite Email is not valid.",
        },
        notEmpty: {
          msg: "Invite Email is required.",
        },
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
);

export default Invitation;
