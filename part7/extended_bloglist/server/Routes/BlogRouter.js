const {
    getAllBloges,
    addNewBlog,
    getBlogById,
    deleteBlogById,
    updateBlogById
} = require('../controllers/BlogController')
const { userExtractor } = require('../utils/middleware')
const commentRoutes = require('./CommentRouter')

const blogRouter = require('express').Router()

blogRouter.route('/').get(getAllBloges).post(userExtractor, addNewBlog)
blogRouter
    .route('/:id')
    .get(getBlogById)
    .delete(deleteBlogById)
    .put(updateBlogById)

blogRouter.use('/:id/comments', commentRoutes)

module.exports = blogRouter
