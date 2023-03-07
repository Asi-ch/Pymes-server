import Sequelize, { Model, DataTypes } from "sequelize";
import sequelize from "../lib/sequelize";
import {
  TransportDetail,
  Address,
  ContactDetail,
  Store,
  Client,
  Item,
  Attachment,
} from ".";
import { BillType } from "../lib/types";

class Bill extends Model {
  public id!: number;
  public billNo: string;
  public billDate: Date;
  public subTitle: string;
  public status: string;
  public StoreId!: Store;
  public ClientId!: Client;
  public shippedFrom: Address[];
  public shippedTo: Address[];
  public transportDetail: TransportDetail[];
  public items: Item[];
  public amount: number;
  public tax: number;
  public discount: number;
  public termsAndConditions: string;
  public notes: string;
  public billType: BillType;
  public attachments: Attachment[];
  public signature: string;
  public contactDetail: ContactDetail[];
  public emailSent: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bill.init(
  {
    billNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "bill Number is required.",
        },
      },
    },
    billDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "bill Date is required.",
        },
      },
    },
    billType: {
      type: DataTypes.ENUM,
      values: [BillType.INVOICE, BillType.Quotation],
      allowNull: false,
    },
    subTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StoreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    termsAndConditions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailSent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
  }
);

export default Bill;
