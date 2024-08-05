// Always use const when you are importing
const express = require('express')
const path=require('path')

// Use const for instanciation and function call assignment

// Imports should be on the top
const userRouter = require('./routes/userRoutes')
const playlistRouter = require('./routes/PlaylistRoutes')
// console.log(playlistRouter)
const courseRouter = require('./routes/courseRoutes')
const lectureRouter = require('./routes/lectureRoutes')
const userCourseRouter = require('./routes/UserCourse')
// console.log('space')
// console.log(courseRouter)

const app = express()
app.use( express.static(path.join(__dirname, 'uploads')));
// Write helpful comments
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
require('dotenv').config()

app.use('/api/users', userRouter)
app.use('/api/users/:id/playlists', playlistRouter)
app.use('/api/users/:id/courses', courseRouter)
app.use('/api/users/:id/lectures', lectureRouter)
app.use('/api/users/:id/usercourses', userCourseRouter)

app.listen('4000', () => console.log('server is runnig on the port is 4000'))

