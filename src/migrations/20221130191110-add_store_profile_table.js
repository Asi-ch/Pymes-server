'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up:async  (queryInterface, Sequelize) => {
    return queryInterface.createTable('StoreProfiles', {
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
      businessType: {
        type: Sequelize.ENUM('INDIVIDUAL', 'TEAM'),
        defaultValue: 'INDIVIDUAL',
        values:['INDIVIDUAL', 'TEAM']
      },
      profileUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessStartDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      tagLine: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      information: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('StoreProfiles');
  }
};
