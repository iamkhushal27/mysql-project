'use strict';
var {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('users',{
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role: {
          type: DataTypes.ENUM('admin', 'user'),
          allowNull: false
      },
      createdAt: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      updatedAt: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
  } );
     
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.dropTable('users');
     
  }
};
