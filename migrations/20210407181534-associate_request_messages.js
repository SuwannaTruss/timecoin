"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return (
      queryInterface.addColumn("Messages", "SenderId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Requests", // name of Target model
          key: "UserId", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
      queryInterface.addColumn("Messages", "RequestId", {
        type: Sequelize.INTEGER,
        references: {
          model: "Requests", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
    );
  },

  down: async (queryInterface, Sequelize) => {
    return (
      queryInterface.removeColumn(
        "Messages", // name of Source model
        "SenderId" // key we want to remove
      ),
      queryInterface.removeColumn(
        "Messages", // name of Source model
        "RequestId" // key we want to remove
      )
    );
  },
};
