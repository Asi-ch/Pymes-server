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
import QuotationItem from "./quotationItem";
import QuotationContactDetail from "./quotationContactDetail";
import QuotationShippedFrom from "./quotationShippedFrom";
import QuotationShippedTo from "./quotationShippedTo";
import QuotationTransportDetail from "./quotationTransportDetail";
import QuotationAttachment from "./quotationAttachment";
import Invoice from "./invoice";
import InvoiceAttachment from "./invoiceAttachment";
import InvoiceContactDetail from "./invoiceContactDetail";
import InvoiceItem from "./invoiceItem";
import InvoiceShippedFrom from "./invoiceShippedFrom";
import InvoiceShippedTo from "./invoiceShippedTo";
import InvoiceTransportDetail from "./invoiceTransportDetail";
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
  QuotationItem,
  QuotationShippedTo,
  QuotationShippedFrom,
  QuotationAttachment,
  QuotationTransportDetail,
  QuotationContactDetail,
  Invoice,
  InvoiceItem,
  InvoiceShippedTo,
  InvoiceShippedFrom,
  InvoiceAttachment,
  InvoiceTransportDetail,
  InvoiceContactDetail,
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


  Quotation.belongsToMany(Address, {
    through: "QuotationShippedFroms",
    as: "shippedFrom",
    foreignKey: "QuotationId"
  })

  Quotation.belongsToMany(Address, {
    through: "QuotationShippedTos",
    as: "shippedTo",
    foreignKey: "QuotationId"
  })

  Quotation.belongsToMany(TransportDetail, {
    through: "QuotationTransportDetail",
    as: "transportDetail",
    foreignKey: "QuotationId"
  })
  Quotation.belongsToMany(ContactDetail, {
    through: "QuotationContactDetail",
    as: "contactDetail",
    foreignKey: "QuotationId"
  })

  Quotation.belongsToMany(Item, {
    through: "QuotationItems",
    as: "items",
    foreignKey: "QuotationId"
  })

  Quotation.belongsToMany(Attachment, {
    through: "QuotationAttachments",
    as: "attachments",
    foreignKey: "QuotationId"
  })


  Invoice.belongsToMany(Address, {
    through: "InvoiceShippedFroms",
    as: "shippedFrom",
    foreignKey: "InvoiceId"
  })

  Invoice.belongsToMany(Address, {
    through: "InvoiceShippedTos",
    as: "shippedTo",
    foreignKey: "InvoiceId"
  })

  Invoice.belongsToMany(TransportDetail, {
    through: "InvoiceTransportDetail",
    as: "transportDetail",
    foreignKey: "InvoiceId"
  })
  Invoice.belongsToMany(ContactDetail, {
    through: "InvoiceContactDetail",
    as: "contactDetail",
    foreignKey: "InvoiceId"
  })

  Invoice.belongsToMany(Item, {
    through: "InvoiceItems",
    as: "items",
    foreignKey: "InvoiceId"
  })

  Invoice.belongsToMany(Attachment, {
    through: "InvoiceAttachments",
    as: "attachments",
    foreignKey: "InvoiceId"
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