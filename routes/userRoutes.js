const controller = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/userMiddlewares')
const { isAdmin } = require('../middlewares/adminMiddlewares')
const express = require('express')
const upload=require('../utils/multer')



// Routers
// const playlistRouter = require("./PlaylistRoutes")

// Middlewares
// const authenticateUser = require("../middlewares/userMiddlewares")

const router = express.Router()

router.post('/',upload.single('profileImage'), controller.register)
router.post('/login', controller.login)
router.get('/:id', isAuthenticated, controller.getMyProfile)
router.get('/', controller.renderPage)
router.delete('/:id', isAuthenticated, controller.deleteMyProfile)
router.put('/:id/changepassword', isAuthenticated, controller.changePassword)
router.put('/:id', isAuthenticated, controller.updateProfile)
router.get('/:id/getallusers', isAuthenticated, isAdmin, controller.getAllUsers)
router.put('/:id/changerole', isAuthenticated, isAdmin, controller.updateUserRole)
router.delete('/:id/deleteuser', isAuthenticated, isAdmin, controller.deleteUser)


module.exports = router