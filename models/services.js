"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Services.belongsTo(models.Users);
      Services.belongsTo(models.Categories, { foreignKey: "categoryId" });
      Services.hasMany(models.Requests, { foreignKey: "serviceId" });
    }
  }
  Services.init(
    {
      description: DataTypes.STRING,
      servicename: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Services",
    }
  );
  return Services;
};
