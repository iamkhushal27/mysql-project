const jwt = require('jsonwebtoken')
const { users: Users, courses: Courses, playlists: Playlists } = require('../models')

// console.log(Users,Courses,Playlists)
const { secret } = require('../constants')
// const { use } = require('../routes/userRoutes')          

module.exports = {
    isAuthenticated: async (req, res, next) => {
        try {
            const { id } = req.params
            console.log(id)
            let user = await Users.findByPk(id)
            if (!user) {
                throw { status: 404, message: 'user is not present' }
            }
            user=user.toJSON() 
            delete user.password 
            console.log(user)

            console.log('space')
            const token = req.header('Authorization')
            if (!token) {
                throw { status: 404, message: 'token is require' }
            }
            // Implement a check on token

            // No need of await here as jwt.verify is not an async function
            var decordedtoken = jwt.verify(token, secret)
            // console.log('space')
            if (user.id != decordedtoken.id) {
                // Throw error
                throw { status: 404, message: 'token || id is wrong' }

            }

            req.user = user
            next()
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }


    }
}