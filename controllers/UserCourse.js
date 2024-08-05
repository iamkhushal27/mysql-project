const { playlists: Playlists, courses: Courses, users: Users,usercourses:Usercourses } = require('../models')
console.log(Usercourses)
const { secret } = require('../constants')
const { where } = require('sequelize')

console.log(Playlists)

module.exports = {
    addToTable: async (req, res) => {
        try {
            const { fkofUserId, fkCourseId } = req.body
            if (!fkCourseId || !fkofUserId) {
                throw { status: 404, message: 'require fields cannot be empty' }
            }
            

            const usercourse = await Usercourses.create({
                fkofUserId,
                fkCourseId
            })
            res.status(200).send({
                message: 'user and course realation is made',
                usercourse
            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    removeFromtable: async (req, res) => {
        try {

            const { usercourseid } = req.params
            console.log(usercourseid)
            await Usercourses.destroy({
                where: {
                    id:usercourseid
                }
            })
            res.status(200).send('user and course relation remove succsesfully')
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    getAllFromTable: async (req, res) => {
        try {
            const usercourse = await Usercourses.findAll({
                include: [{
                    model: Users,
                    as: "users"
                },
                {
                    model: Courses,
                    as: 'courses'
                },
                ]
            })
            res.status(200).send(usercourse)
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },

}