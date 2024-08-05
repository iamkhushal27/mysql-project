const controller = require('../controllers/courseController')
const { isAuthenticated } = require('../middlewares/userMiddlewares')
const { isAdmin } = require('../middlewares/adminMiddlewares')

const express = require('express')
const router = express.Router({ mergeParams: true })

router.get('/', controller.getAllCourses)
router.post('/', isAuthenticated, isAdmin, controller.createCourse)
router.delete('/:courseid', isAuthenticated, isAdmin, controller.deleteCourse)


module.exports = router