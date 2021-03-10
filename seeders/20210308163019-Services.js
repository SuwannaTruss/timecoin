'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return queryInterface.bulkInsert('services', [{
    description: 'I teach French',
    servicename: 'teaching',
    UserId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    description: 'I teach Thai',
    servicename: 'teaching',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    description: 'I teach Thai cooking',
    servicename: 'cooking',
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  } ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('services', null, {});
  }
};
