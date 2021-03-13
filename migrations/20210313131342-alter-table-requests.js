'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addColumn("Requests", "amount", {
          type: Sequelize.INTEGER,
          defaultValue: 1
        }),
      await queryInterface.addColumn("Requests", "serviceDate", {
        type: Sequelize.DATEONLY,
      }),
      await queryInterface.addColumn("Requests", "serviceTime", {
        type: Sequelize.TIME
      }),
      await queryInterface.changeColumn("Requests", "status", {
        type: Sequelize.STRING,
      })
    ]);   
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeColumn("Requests", "amount"),
      await queryInterface.removeColumn("Requests", "serviceDate"),
      await queryInterface.removeColumn("Requests", "serviceTime"),
      await queryInterface.changeColumn("Requests", "status")
    ])
  }
};
