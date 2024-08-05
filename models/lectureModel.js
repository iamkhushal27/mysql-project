var sequelize = require('./index')
var { DataTypes } = require('sequelize')
var moment = require('moment')
const { type } = require('os')
const { title } = require('process')
module.exports = (sequelize, DataTypes) => {
    var Lecture = sequelize.define('lectures', {
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
        fkCourseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           

        },
        videoUrl: {
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
    Lecture.beforeCreate((lectures) => {
        lectures.dataValues.createdAt = moment().unix()
        lectures.dataValues.updatedAt = moment().unix()
    })
    Lecture.beforeUpdate((lectures) => {
        lectures.dataValues.updatedAt = moment().unix()
    })
    Lecture.associate = ((models) => {
        Lecture.belongsTo(models.courses, {
            foreignKey: "fkCourseId",
            as: 'courses'
        })
    })
    return Lecture

}