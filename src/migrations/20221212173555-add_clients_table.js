'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('Clients', {
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
      logoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email:  {
        type: Sequelize.STRING,
        allowNull: true
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      uniqueId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      aliasName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vatRegistrationNumber: {
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
    return queryInterface.dropTable('Clients');
  }
};
