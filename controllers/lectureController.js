const { lectures: Lectures, courses: Courses } = require('../models')
const { where } = require('sequelize')

console.log(Lectures)

module.exports = {
    addLecture: async (req, res) => {
        try {
            const { title, description, videoUrl, fkCourseId } = req.body
            console.log(fkCourseId)
            if (!title || !description || !videoUrl || !fkCourseId) {
                throw { status: 400, message: "Required fields can't be empty!" }
            }
            const lecture = await Lectures.create({
                title,
                description,
                videoUrl,
                fkCourseId
            })


            res.status(200).send({ message: 'lecture is created by admin', lecture }
            )
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }

    },
    getAlllectures: async (req, res) => {

        try {
            const allLectures = await Lectures.findAll({
                include:
                {
                    model: Courses,
                    as: 'courses'
                }
            })
            if (!allLectures) {
                throw { status: 400, message: 'cant get the courses something is wrong' }
            }
            res.status(200).send({
                message: 'all lecture  are get it from database',
                allLectures
            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }
    },
    deletelecture: async (req, res) => {

        try {
            const { lectureid } = req.params
            console.log(lectureid)
            await Lectures.destroy({
                where: {
                    id: lectureid
                }
            })
            res.status(200).send({ message: 'course is deleted' })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')

        }
    },

}