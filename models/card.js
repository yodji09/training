'use strict';
module.exports = (sequelize, DataTypes) => {
  class Card extends sequelize.Sequelize.Model{}

  Card.init({
    name : DataTypes.STRING,
    type: DataTypes.STRING,
    rarity: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName : "Card"
  });
  Card.associate = function(models) {
    // associations can be defined here
    Card.belongsTo(models.User)
  };
  return Card;
};