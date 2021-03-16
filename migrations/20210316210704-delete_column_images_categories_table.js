"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Categories", "image"),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Categories", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};
