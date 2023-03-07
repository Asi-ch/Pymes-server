import User from "./user";
import Store from "./store";
import Invitation from "./invitation";
import UserStore from "./userstore";
import UserType from "./usertype";
import Subscription from "./subscription";
import Product from "./product";
import ProductVariation from "./productvariation";
import Category from "./category";
import Client from "./client";
import StoreProfile from "./storeProfile";
import Address from "./address";
import Bill from "./bill";
import ClientAddress from "./clientAddress";
import StoreAddress from "./storeAddress";
import Attachment from "./attachment";
import TransportDetail from "./transportDetail";
import ContactDetail from "./contactDetail";
import Item from "./item";
import BillItem from "./billItem";
import BillContactDetail from "./billContactDetail";
import BillShippedFrom from "./billShippedFrom";
import BillShippedTo from "./billShippedTo";
import BillTransportDetail from "./billTransportDetail";
import BillAttachment from "./billAttachment";
export {
  User,
  Store,
  Invitation,
  UserType,
  UserStore,
  Subscription,
  Product,
  ProductVariation,
  Category,
  Client,
  StoreProfile,
  Address,
  Bill,
  ClientAddress,
  StoreAddress,
  Attachment,
  TransportDetail,
  ContactDetail,
  Item,
  BillItem,
  BillShippedTo,
  BillShippedFrom,
  BillAttachment,
  BillTransportDetail,
  BillContactDetail,
};

export default () => {
  //User Associations
  User.hasMany(Invitation);
  User.belongsToMany(Store, {
    through: "UserStore",
    as: "stores",
    foreignKey: "UserId",
  });
  User.belongsToMany(UserType, {
    through: "UserStore",
    as: "user_types",
    foreignKey: "UserId",
  });
  User.hasMany(Subscription);

  // Invitation Associations
  Invitation.belongsTo(User);

  //Store Associations
  Store.hasMany(UserStore);
  Store.belongsToMany(User, {
    through: "UserStore",
    as: "users",
    foreignKey: "StoreId",
  });
  Store.belongsToMany(UserType, {
    through: "UserStore",
    as: "user_types",
    foreignKey: "StoreId",
  });
  Store.hasMany(Product);
  Store.hasMany(Category);
  Store.hasMany(Client);

  //Product Associations
  Product.hasMany(ProductVariation);
  Product.belongsTo(Category);
  Product.belongsTo(Store);
  //Category Associations
  Category.hasMany(Product);
  Category.belongsTo(Store);
  ProductVariation.belongsTo(Product);

  Client.belongsToMany(Address, {
    through: "ClientAddresses",
    as: "addresses",
    foreignKey: "ClientId",
  });

  Bill.belongsToMany(Address, {
    through: "BillShippedFroms",
    as: "shippedFrom",
    foreignKey: "BillId",
  });

  Bill.belongsToMany(Address, {
    through: "BillShippedTos",
    as: "shippedTo",
    foreignKey: "BillId",
  });

  Bill.belongsToMany(TransportDetail, {
    through: "BillTransportDetail",
    as: "transportDetail",
    foreignKey: "BillId",
  });
  Bill.belongsToMany(ContactDetail, {
    through: "BillContactDetail",
    as: "contactDetail",
    foreignKey: "BillId",
  });

  Bill.belongsToMany(Item, {
    through: "BillItems",
    as: "items",
    foreignKey: "BillId",
  });

  Bill.belongsToMany(Attachment, {
    through: "BillAttachments",
    as: "attachments",
    foreignKey: "BillId",
  });

  // Store.hasMany(Bill)

  // Bill.belongsTo(Store)
  // Bill.belongsTo(Client)

  Store.belongsToMany(Address, {
    through: "StoreAddresses",
    as: "addresses",
    foreignKey: "StoreId",
  });
};
