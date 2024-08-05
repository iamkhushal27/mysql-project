const { courses: Courses,lectures:Lectures,users:Users,playlists:Playlists } = require('../models')

const { where } = require('sequelize')

console.log(Courses)

module.exports = {
    createCourse: async (req, res) => {
        try {
            const { title, description, category } = req.body
            if (!title || !description || !category ) {
                throw { status: 400, message: "Required fields can't be empty!" }
            }
            const createCourse = await Courses.create({
                title,
                description,
                category,
                
            })


            res.status(200).send({ message: 'course is created by admin', createCourse }
            )
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }

    },
    getAllCourses: async (req, res) => {

        try {
            const allCourses = await Courses.findAll({
                include:
                {
                    model: Lectures,
                    as: 'lectures'
                }
            })
            if (!allCourses) {
                throw { status: 400, message: 'cant get the courses something is wrong' }
            }
            res.status(200).send({
                message: 'all courses  are get it from database',
                allCourses
            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }
    },
    deleteCourse: async (req, res) => {

        try {
            const { courseid } = req.params
            console.log(courseid)
            await Courses.destroy({
                where: {
                    id: courseid
                }
            })
            res.status(200).send({ message: 'course is deleted' })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }
    },

}