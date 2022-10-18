'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductVariations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      VariationChoiceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'VariationChoices',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      VariationDimensionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'VariationDimensions',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      InventoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Inventory',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      value:{
        type:Sequelize.STRING,
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
    return queryInterface.dropTable('ProductVariations');
  }
};
