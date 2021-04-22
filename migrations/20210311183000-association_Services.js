'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Services", // name of Source model
      "UserId", // nameof the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", 
      }
    ), 
    queryInterface.addColumn(
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Services", // name of Source model
      "UserId" // key we want to remove
    ),
    queryInterface.removeColumn(
          "Services", // name of Source model
          "categoryId" // key we want to remove
    );
  }
};
