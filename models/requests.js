'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  
  class Requests extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
    static associate(models) {
      Requests.belongsTo
    }
  };
  Requests.init({
    storage: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Requests',
  });
  
  // Requests.associate = function(models) {
  //   // One-to-Many, one artist can have many albums
  //     Artist.hasMany(models.Album);
  // };

  return Requests;
};