const express = require('express')
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')
const blogRouter = require('./Routes/BlogRoutes')
const userRouter = require('./Routes/UserRoutes')
const testRoutes = require('./Routes/TestingRoutes')
const connectDb = require('./utils/ConnectDb')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())
app.use(cors())
// app.use(middleware.requestLogger)
//*Connect mongodb
connectDb()

morgan.token('body', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
    else ''
})
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.use(middleware.tokenExtractor)
//*Rotes
if (process.env.NODE_ENV === 'development') {
    app.use('/api/testing', testRoutes)
}
app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)

//*Custon Function Middleware
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
