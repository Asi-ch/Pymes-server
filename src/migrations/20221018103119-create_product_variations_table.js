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
     
      size:{
        type:Sequelize.STRING,
        allowNull: true,
      },
      color:{
        type:Sequelize.STRING,
        allowNull: true,
      },
      quantity:{
        type:Sequelize.INTEGER,
        allowNull: false,
      },
      cost:{
        type:Sequelize.INTEGER,
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
