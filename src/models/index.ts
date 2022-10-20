import User from "./user";
import Store from "./store"
import Invitation from "./invitation";
import UserStore from "./userstore";
import UserType from "./usertype";
import Subscription from "./subscription";
import Product from "./product";
import ProductVariation from "./productvariation";
export {
  User,
  Store,
  Invitation,
  UserType,
  UserStore,
  Subscription,
  Product,
  ProductVariation
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


  //Product Associations
  Product.hasMany(ProductVariation)

  //VariationChoice Associations



}