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
      Requests.belongsTo(models.Users)
      // Requests.belongsTo(models.Transactions)
      Requests.belongsTo(models.Services, { foreignKey: "serviceId"})
    }
  };
  Requests.init({
    storage: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    serviceDate: DataTypes.DATEONLY,
    serviceTime: DataTypes.TIME
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