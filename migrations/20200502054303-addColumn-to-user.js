'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface
      .addColumn("Users", "username", {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false
      })
      .then(()=>{
        return queryInterface.addColumn("Users", "email", {
          type:Sequelize.STRING,
          unique : true,
          allowNull : false
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return queryInterface
      .removeColumn("Users", "username")
      .then(()=>{
        return queryInterface.removeColumn("Users", "email")
      })
  }
};
