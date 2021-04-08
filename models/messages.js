"use strict";
const { Model } = require("sequelize");
//const messages = require('./messages');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Messages.belongsTo(models.Requests);
      Messages.belongsTo(models.Requests, { as: "SenderId" });
      // Messages.belongsToMany(models.Requests, {
      //   through: "message_request",
      //   targetKey: "id",
      //   targetKey: "UserId",
      // });
      Messages.belongsTo(models.Requests, { as: "RequestId" });
    }
  }
  Messages.init(
    {
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
