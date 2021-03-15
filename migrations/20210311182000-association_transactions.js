'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        "Transactions", // name of Source model
        "RequestId", // nameof the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Requests", // name of Target model
            key: "id", // key in Target model that we're referencing
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL", 
        }
      );
  },

  down: async (queryInterface, Sequelize) => {
    return quEeryInterface.removeColumn(
      "Transactions", // name of Source model
      "RequestId" // key we want to remove
    );
  }
};
