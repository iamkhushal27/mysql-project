const express = require('express')
const controller = require('../controllers/playlistController')

const router = express.Router({ mergeParams: true })

router.post('/', controller.addToPlaylist)
router.delete('/', controller.removeFromPlaylist)
router.get('/', controller.getAllFromPlaylist)


module.exports = router
