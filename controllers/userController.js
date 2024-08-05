
const { users: Users } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../constants')
const { use } = require('../routes/userRoutes')
const { where } = require('sequelize')

module.exports = {
    register: async (req, res) => {
        try {

            const { name, email, password, role } = req.body
            // console.log('one')
            console.log(req.file)

            const { path } = req.file
            const profileImage = path

            // console.log(req)
            console.log(path)
            // console.log(name)
            if (!name || !password || !email || !role) {
                throw { status: 400, message: "Required fields can't be empty!" }
            }
            let user = await Users.findOne({
                where: {
                    email
                }
            })
            if (user) {
                throw { status: 400, message: "This email is already in use" }
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            user = await Users.create({

                name,
                email,
                password: hashedPassword,
                role,
                profileImage


            })
            res.status(200).send({
                user
            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || "Something went wrong!")
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                // throw error over here instead of sending a response.
                throw { status: 400, message: "Required fields can't be empty!" }

            }
            let user = await Users.findOne({
                where: {
                    email
                }
            })
            console.log(user)
            if (!user) {
                // throw error
                throw { status: 400, message: "email is wrong" }
            }
            const decodedPassword = await bcrypt.compare(password, user.password)
            if (!decodedPassword) {
                // throw error
                throw { status: 400, message: "Password is wrong" }
            }
            user = user.toJSON()

            // jwt.sign is not an asyncrhronous function, so we don't need await here. You can remove it. Also, token should be const
            const token = jwt.sign(user, secret)
            delete user.password

            // Delete password from token here

            res.status(200).send({
                message: 'u are sucsessfully login',
                token,
                user
                // Send user info in the response
            })
            // Also send status code

        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }
    },
    getMyProfile: async (req, res) => {
        try {
            let { user } = req
            // console.log(user)

            // user = user.toJSON()

            delete user.password
            // console.log(user)

            // Remove password from users object before sending it in the response
            res.status(200).render('profile', { user })
        } catch (error) {
            console.log(error)
            // modify it as catch block in register controller
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    deleteMyProfile: async (req, res) => {
        try {
            const { id } = req.params
            await Users.destroy({
                where: {
                    id
                }
            })
            res.status(200).send('user profile is deleted')
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }
    },
    changePassword: async (req, res) => {
        try {
            let { user } = req;
            const { password } = req.body
            const { id } = req.params
            if (!password) {
                throw { status: 404, message: 'password is not given' }
            }
            const hashedPassword = await bcrypt.hash(password, 12)



            user = await Users.update({
                password: hashedPassword
            }, 
            {
                where: {
                    id
                },individualHooks: true
            })
         
            res.status(200).send({
                message: 'password is change',

            })

        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    updateProfile: async (req, res) => {
        try {
            const { name } = req.body
            if (!name) {
                throw { status: 400, message: "name field can't be empty!" }
            }
            const { id } = req.params
            let user = await Users.update({
                name
            },
                {
                    where: {
                        id
                    },
                    individualHooks: true
                })
            // user = user.toJSON()
            // delete user.password
            res.status(200).send({
                message: 'profile is update it',

            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }


    }, getAllUsers: async (req, res) => {
        try {
            const allUsers = await Users.findAll()
            if (!allUsers) {
                throw { status: 400, message: 'not geting all the users' }
            }
            res.status(200).send(
                {

                    message: 'user is admin',
                    allUsers
                }
            )
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'somethings is went wrong')
        }

    },
    updateUserRole: async (req, res) => {
        try {
            const { role, changeRoleOf } = req.body
            if (!role) {
                throw { status: 400, message: 'role is required' }
            }

            let user = await Users.update({
                role
            },
                {
                    where: {
                        id: changeRoleOf
                    },
                    individualHooks: true
                })

            res.status(200).send({
                message: 'role is succesfully change',
            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }
    },
    deleteUser: async (req, res) => {

        try {
            const { id } = req.params
            await Users.destroy({
                where: {
                    id
                }
            })
            res.status(200).send({ message: 'user is deleted' })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    renderPage: async (req, res) => {

        try {

            res.status(200).render('user')
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
}