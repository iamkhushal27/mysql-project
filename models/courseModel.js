var sequelize = require('./index')
var { DataTypes } = require('sequelize')
var moment = require('moment')
const { type } = require('os')
const { title } = require('process')
module.exports = (sequelize, DataTypes) => {
    let Course = sequelize.define('courses', {
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
    })
    Course.beforeCreate((courses) => {
        courses.dataValues.createdAt = moment().unix()
        courses.dataValues.updatedAt = moment().unix()
    })
    Course.beforeUpdate((courses) => {
        courses.dataValues.updatedAt = moment().unix()
    })
    Course.associate = ((models) => {
        Course.belongsToMany(models.users, {
            through: "Usercourses",
            foreignKey: "fkofUserId",
            as: 'users'
        })
        Course.hasMany(models.lectures, {
            foreignKey: "fkCourseId",
            as: "lectures"
        })
        Course.hasMany(models.playlists, {
            foreignKey: "fkCourseId",
            as: 'playlists'
        })
    })
   
    return Course
}