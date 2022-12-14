const {
    getAllBloges,
    addNewBlog,
    getBlogById,
    deleteBlogById,
    updateBlogById
} = require('../controllers/BlogController')

const blogRouter = require('express').Router()

blogRouter.route('/').get(getAllBloges).post(addNewBlog)
blogRouter
    .route('/:id')
    .get(getBlogById)
    .delete(deleteBlogById)
    .put(updateBlogById)

module.exports = blogRouter
