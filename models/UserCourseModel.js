var sequelize = require('./index')
var { DataTypes } = require('sequelize')
var moment = require('moment')
const { type } = require('os')
const { title } = require('process')
module.exports = (sequelize, DataTypes) => {
    const Usercourse = sequelize.define('usercourses', {
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
    })
    Usercourse.beforeCreate((usercourse) => {
        usercourse.dataValues.createdAt = moment().unix()
        usercourse.dataValues.updatedAt = moment().unix()
    })
    Usercourse.beforeUpdate((usercourse) => {
        usercourse.dataValues.updatedAt = moment().unix()
    })
    Usercourse.associate = ((models) => {
        Usercourse.belongsTo(models.users, {
            foreignKey: "fkofUserId",
            as: 'users'
        })
        Usercourse.belongsTo(models.courses, {
            foreignKey: "fkCourseId",
            as: "courses"
        })

    })

    return Usercourse
}