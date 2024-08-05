'use strict';
var {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('courses', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false
      },
      description: {
          type: DataTypes.STRING,
          allowNull: false
      },
      category: {
          type: DataTypes.STRING,
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
    
     await queryInterface.dropTable('courses');
     
  }
};