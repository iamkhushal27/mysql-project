var jwt = require('jsonwebtoken')
var { users: Users } = require('../models')
console.log(Users)


const { secret } = require('../constants')
const { where } = require('sequelize')
module.exports = {
    isAdmin: async (req, res, next) => {
        try {
            const { user } = req
            if (user.role != "admin") {
                console.log('inside')
                return res.send('user is not admin')
            }
            next()
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }


    }
}