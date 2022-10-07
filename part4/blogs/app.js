const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./Routes/BlogRoutes')
const userRouter = require('./Routes/UserRoutes')
const connectDb = require('./utils/ConnectDb')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())
app.use(cors())
// app.use(middleware.requestLogger)
//*Connect mongodb
connectDb()
app.use(middleware.tokenExtractor)
//*Rotes
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)

//*Custon Function Middleware
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
