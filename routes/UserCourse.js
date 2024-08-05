const express = require('express')
const controller = require('../controllers/UserCourse')
const { isAuthenticated } = require('../middlewares/userMiddlewares')
const { isAdmin } = require('../middlewares/adminMiddlewares')

const router = express.Router({ mergeParams: true })

router.post('/', isAuthenticated,isAdmin,controller.addToTable)
router.delete('/:usercourseid',isAuthenticated,isAdmin, controller.removeFromtable)
router.get('/', controller.getAllFromTable)


module.exports = router