const Blog = require('../models/Blogs')

/**
 * @route : GET api/blogs
 * @desc : Return  All the blogs
 * @access : Public
 */
const getAllBloges = (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
}
/**
 * @route : PUT api/blogs
 * @desc : Add  new blog
 * @access : Public
 */
const addNewBlog = (request, response) => {
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    })
}

module.exports = {
    getAllBloges,
    addNewBlog
}
