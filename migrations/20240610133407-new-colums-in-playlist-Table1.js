'use strict';
const {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.addColumn('playlists','fkCourseId',{
      type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model:'courses',
              key:"id"
            },
            
            // onUpdate:"CASCADE",
            onDelete:"CASCADE",
            after:"fkofUserId"

     });
     
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.removeColumn('playlists','fkCourseId',{

     });
     
  }
};

