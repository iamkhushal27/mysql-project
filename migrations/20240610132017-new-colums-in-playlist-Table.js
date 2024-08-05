'use strict';
const {DataTypes}=require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.addColumn('playlists','fkofUserId',{
      type: DataTypes.INTEGER,
            allowNull: false,
            references:{
              model:'users',
              key:"id"
            },
            
            onUpdate:"CASCADE",
            onDelete:"CASCADE",
            after:"id"

     });
     
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.removeColumn('playlists','fkofUserId',{

     });
     
  }
};
