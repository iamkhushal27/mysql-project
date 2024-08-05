'use strict';
const {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.addColumn('playlists',"updatedAt", { 
      type: DataTypes.INTEGER,
      allowNull: false
      });
      after:'createdAt'
     
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.removeColumn('playlists',"updatedAt");
     
  }
};
