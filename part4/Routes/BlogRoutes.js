const { getAllBloges, addNewBlog } = require('../controllers/BlogController')

const blogRouter = require('express').Router()

blogRouter.route('/').get(getAllBloges).post(addNewBlog)

module.exports = blogRouter
