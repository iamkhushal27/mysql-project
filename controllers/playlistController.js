const { playlists: Playlists, courses: Courses, users: Users } = require('../models')
const { secret } = require('../constants')
const { where } = require('sequelize')

console.log(Playlists)

module.exports = {
    addToPlaylist: async (req, res) => {
        try {
            const { fkofUserId, fkCourseId } = req.body
            if (!fkCourseId || !fkofUserId) {
                throw { status: 404, message: 'require fields cannot be empty' }
            }
            const { user } = req
            console.log(user)

            const playlist = await Playlists.create({
                fkofUserId,
                fkCourseId
            })
            res.status(200).send({
                message: 'user is add to playlist',
                playlist
            })
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    removeFromPlaylist: async (req, res) => {
        try {

            const { id } = req.params
            await Playlists.destroy({
                where: {
                    id
                }
            })
            res.status(200).send('user is remove   from playists succsesfully')
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },
    getAllFromPlaylist: async (req, res) => {
        try {
            const playlist = await Playlists.findAll({
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
            res.status(200).send(playlist)
        } catch (error) {
            console.log(error)
            res.status(error.status || 500).send(error.message || 'something went wrong')
        }

    },

}