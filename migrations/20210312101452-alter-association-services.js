'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Categories', 'categoryId', {
      name:"CategoryId"
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Categories', 'CategoryId', {
      name:"categoryId"
    });
  }
};
