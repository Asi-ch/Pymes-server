'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up:async  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VariationDimensions', [
      {
        name: 'size',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'color',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VariationDimensions', null, {});
  }
};
