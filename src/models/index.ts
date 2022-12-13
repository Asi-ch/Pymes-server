import User from "./user";
import Store from "./store"
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
import Quotation from "./quotation";
import ClientAddress from "./clientAddress";
import StoreAddress from "./storeAddress";
import Attachment from "./attachment";
import TransportDetail from "./transportDetail";
import ContactDetail from "./contactDetail";
import Item from "./item";
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
  Quotation,
  ClientAddress,
  StoreAddress,
  Attachment,
  TransportDetail,
  ContactDetail,
  Item,
}

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
  User.hasMany(Subscription)

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
  Store.hasMany(Product)
  Store.hasMany(Category)
  Store.hasMany(Client)

  //Product Associations
  Product.hasMany(ProductVariation)
  Product.belongsTo(Category)
  Product.belongsTo(Store)
  //Category Associations
  Category.hasMany(Product)
  Category.belongsTo(Store)
  ProductVariation.belongsTo(Product)


  Client.belongsToMany(Address, {
    through: "ClientAddresses",
    as: "addresses",
    foreignKey: "ClientId"
  })


  // Store.hasMany(Quotation)

  // Quotation.belongsTo(Store)
  // Quotation.belongsTo(Client)

  Store.belongsToMany(Address, {
    through: "StoreAddresses",
    as: "addresses",
    foreignKey: "StoreId"
  })
}