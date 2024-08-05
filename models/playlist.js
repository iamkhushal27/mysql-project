var sequelize = require('./index')
var { DataTypes } = require('sequelize')
var moment = require('moment')
const { type } = require('os')
const { title } = require('process')
module.exports = (sequelize, DataTypes) => {
    var Playlist = sequelize.define('playlists', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        fkofUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        createdAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    })
    Playlist.beforeCreate((playlists) => {
        playlists.dataValues.createdAt = moment().unix()
        playlists.dataValues.updatedAt = moment().unix()
    })
    Playlist.beforeUpdate((playlists) => {
       
        playlists.dataValues.updatedAt = moment().unix()
    })
    Playlist.associate = ((models) => {
        Playlist.belongsTo(models.users, {
            foreignKey: "fkofUserId",
            as: 'users'
        })
        Playlist.belongsTo(models.courses, {
            foreignKey: "fkCourseId",
            as: 'courses'
        })
    })
    

    return Playlist
}