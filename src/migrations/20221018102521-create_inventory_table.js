'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Inventory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StoreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Stores',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      quantity:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      cost:{
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('Inventory');
  }
};
