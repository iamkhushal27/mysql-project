var sequelize = require('./index')
var { DataTypes } = require('sequelize')
var moment = require('moment')
const { type } = require('os')
const { profile } = require('console')
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        profileImage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:null
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
            allowNull: false,
            defaultValue: "user"
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
    User.beforeCreate((users) => {
        users.dataValues.createdAt = moment().unix()
        users.dataValues.updatedAt = moment().unix()
    })
    User.beforeUpdate((users) => {
        users.dataValues.updatedAt = moment().unix()
    })
    User.associate = ((models) => {
        User.belongsToMany(models.courses, {
            through: "Usercourses",
            foreignKey: "fkofUserId",
            as: 'courses'
        })
        User.hasMany(models.playlists, {
            foreignKey: "fkofUserId",
            as: 'playlists'
        })
    })
    
   

    return User
}
