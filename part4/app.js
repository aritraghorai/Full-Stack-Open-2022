const express = require('express')
const blogRouter = require('./Routes/BlogRoutes')
const connectDb = require('./utils/ConnectDb')

const app = express()

app.use(express.json())
//*Connect mongodb
connectDb()
//*Rotes
app.use('/api/blogs', blogRouter)

module.exports = app
