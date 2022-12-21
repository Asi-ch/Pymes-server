'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('InvoiceItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      InvoiceId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Invoices',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
      },
      ItemId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Items',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
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
    return queryInterface.dropTable('InvoiceItems');
  }
};
