const controller = require('../controllers/lectureController')
const { isAuthenticated } = require('../middlewares/userMiddlewares')
const { isAdmin } = require('../middlewares/adminMiddlewares')

const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', isAuthenticated, controller.getAlllectures)
router.post('/', isAuthenticated, isAdmin, controller.addLecture)
router.delete('/:lectureid', isAuthenticated, isAdmin, controller.deletelecture)


module.exports = router