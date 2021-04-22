'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username: "suwanna1",
      email: "suwanna@suwanna.com",
      password: "$2b$10$VCLRab9vXrgFEI6bDurg1eLdd715U7EN/R/Fx9iUTU7xWVrgRPTgS",
      firstname: "Suwanna",
      lastname: "Truss",
      location: "Oxford",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: "sename1",
      email: "sename@sename.com",
      password: "$2b$10$SDpaReNkRwpCigeDc481LOrhLyX5UYnyIPRMN7I3/WOay4MzTdXrO",
      firstname: "Sénamé",
      lastname: "Agblevon",
      location: "Berlin",
      createdAt: new Date(),
      updatedAt: new Date()
    } ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
