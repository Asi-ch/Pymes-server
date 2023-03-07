"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("BillTransportDetails", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      BillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Bills",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      TransportDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TransportDetails",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("BillTransportDetails");
  },
};
