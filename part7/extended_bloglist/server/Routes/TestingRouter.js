const testingRouter = require('express').Router()
const Blogs = require('../models/Blogs')
const User = require('../models/User')

testingRouter.post('/reset', async (request, response) => {
    await Blogs.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
})

module.exports = testingRouter
