'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('InvoiceContactDetails', {
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
      ContactDetailId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ContactDetails',
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
    return queryInterface.dropTable('InvoiceContactDetails');
  }
};
