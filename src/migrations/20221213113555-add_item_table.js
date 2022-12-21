'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type:Sequelize.STRING
      },
      taxRate: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
      },
      totalTax: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
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
    return queryInterface.dropTable('Items');
  }
};
