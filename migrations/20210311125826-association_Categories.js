'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Services", // name of Source model
      "categoryId", // nameof the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", 
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        "Services", // name of Source model
        "categoryId" // key we want to remove
      )
    }
};

