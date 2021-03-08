'use strict';
const {
  Model
} = require('sequelize');
const requests = require('./requests');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Services)
      
      Users.hasMany(models.Requests)
    
    }
  };
  Users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};

// const { Sequelize, DataTypes, Model } = require('sequelize');
// const services = require('./services');
// const sequelize = new Sequelize('sqlite::memory');

// class User extends Model {

// User.hasMany(Picture)
// User.belongsTo(Picture, { as: 'ProfilePicture', constraints: false })

// user.getPictures() // gets you all pictures
// user.getProfilePicture() // gets you only the profile picture

// User.findAll({
//   where: ...,
//   include: [
//     { model: Picture }, // load all pictures
//     { model: Picture, as: 'ProfilePicture' }, // load the profile picture.
//     // Notice that the spelling must be the exact same as the one in the association
//   ]
// })

// }

// User.init({
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
//   sequelize, // We need to pass the connection instance
//   modelName: 'User' // We need to choose the model name
// });

// // the defined model is the class itself
// console.log(User === sequelize.models.User); // true