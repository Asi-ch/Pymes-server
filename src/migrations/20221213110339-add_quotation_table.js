'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Quotations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StoreId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
      },
      ClientId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Clients',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
      },
      quotationNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quotationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subTitle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      tax: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      termsAndConditions: {
        type: Sequelize.STRING, allowNull: true
      },
      notes: {
        type: Sequelize.STRING, allowNull: true
      },
      signature: {
        type: Sequelize.STRING, allowNull: true
      },
      emailSent: {
         type: Sequelize.BOOLEAN, allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Quotations');
  }
};
