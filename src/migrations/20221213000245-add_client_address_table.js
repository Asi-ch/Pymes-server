'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClientAddresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      AddressId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Addresses',
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
    return queryInterface.dropTable('ClientAddresses');
  }
};
