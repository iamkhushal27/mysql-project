'use strict';
var {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('playlists', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      createdAt: {
          type: DataTypes.INTEGER,
          allowNull: false
      },

  } );
     
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('playlists');
     
  }
};
