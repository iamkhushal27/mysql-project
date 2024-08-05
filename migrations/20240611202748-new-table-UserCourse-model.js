'use strict';
const {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('usercourses', {
      id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      fkofUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      fkCourseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },

      createdAt: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      updatedAt: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
  });
     
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.dropTable('userscourses');
     
  }
};
