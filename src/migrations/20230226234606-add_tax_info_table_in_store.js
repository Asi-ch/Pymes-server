module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Stores", "vatNumber", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Stores", "vatNumber");
  },
};
