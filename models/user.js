'use strict';
const {generatePassword} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model{}

  User.init({
    name: DataTypes.STRING,
    username : {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        len : [5, 20]
      }
    },
    email : {
      type : DataTypes.STRING,
      unique : true,
      validate : {
        isEmail : true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : [8, 50]
      }
    },
    birthdate: DataTypes.DATEONLY,
    gender: DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate : (user) => {
        user.password = generatePassword(user.password)
      }
    },
    modelName : "User"
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Card)
  };
  return User;
};