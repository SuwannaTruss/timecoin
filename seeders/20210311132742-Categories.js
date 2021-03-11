'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("categories", [{
      categoryName: 'Education', 
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      categoryName: 'Outdoor', 
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      categoryName: 'Housework', 
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      categoryName: 'Caring', 
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      categoryName: 'Pet', 
      createdAt: new Date(),
      updatedAt: new Date()
    } ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
