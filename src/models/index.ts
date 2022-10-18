import User from "./user";
import Store from "./store"
import Invitation from "./invitation";
import UserStore from "./userstore";
import UserType from "./usertype";
import Subscription from "./subscription";
import Product from "./product";
import VariationChoice from "./variationchoice";
import VariationDimension from "./variationdimention";
import Inventory from "./inventory";
import ProductVariation from "./productvariation";
export {
  User,
  Store,
  Invitation,
  UserType,
  UserStore,
  Subscription,
  Product,
  VariationDimension,
  VariationChoice,
  Inventory,
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
  Store.hasMany(Inventory)


  //Product Associations
  ProductVariation.hasMany(Product);

  Product.belongsToMany(VariationChoice, {
    through: "ProductVariation",
    as: "variation_choices",
    foreignKey: "ProductId",
  })
  Product.belongsToMany(VariationDimension, {
    through: "ProductVariation",
    as: "variation_dimensions",
    foreignKey: "ProductId",
  })

  //VariationChoice Associations
  VariationChoice.belongsToMany(VariationDimension, {
    through: "ProductVariation",
    as: "dimensions",
    foreignKey: "VariationChoiceId",
  })
  VariationChoice.belongsToMany(Product, {
    through: "ProductVariation",
    as: "products",
    foreignKey: "VariationChoiceId",
  })

  //Inventory Associations
  Inventory.hasMany(ProductVariation)
  Inventory.belongsTo(Store)


}