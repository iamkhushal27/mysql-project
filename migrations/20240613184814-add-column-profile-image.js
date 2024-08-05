'use strict';
const { DataTypes } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('users', 'profileImage', {
      type: DataTypes.STRING,
      allowNull: false,
      after:'id'

    });

  },

  async down(queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('users','profileImage');
     
  }
};
