'use strict';

    module.exports = {
      up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
          "Requests", // name of Source model
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
          "Requests", // name of Source model
          "serviceId", // nameof the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: "Services", // name of Target model
              key: "id", // key in Target model that we're referencing
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL", 
          }
        );   
    },
    
    

  
    down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
        "Requests", // name of Source model
        "UserId" // key we want to remove
      ),
      queryInterface.removeColumn(
        "Requests", // name of Source model
        "serviceId" // key we want to remove
      );
    }
  };

 
