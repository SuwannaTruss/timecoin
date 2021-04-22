'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Requests)
    }
  };
  Transactions.init({
    // requestId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    dateOfBooking: DataTypes.DATEONLY,
    dateOfService: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};