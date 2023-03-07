import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import { Attachment, Bill } from ".";
class BillAttachment extends Model {
  public id!: number;
  public AttachmentId: Attachment;
  public BillId: Bill;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BillAttachment.init(
  {
    AttachmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    BillId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

export default BillAttachment;
