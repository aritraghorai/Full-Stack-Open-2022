const Blog = require('../models/Blogs')

/**
 * @route : GET api/blogs
 * @desc : Return  All the blogs
 * @access : Public
 */
const getAllBloges = async (req, res) => {
    const blogs = await Blog.find({}).populate({
        path: 'user',
        select: ['name', 'username']
    })
    res.status(200).json(blogs)
}
/**
 * @route : PUT api/blogs
 * @desc : Add  new blog
 * @access : Private
 */
const addNewBlog = async (req, res) => {
    const user = req.user
    const { title, author, url, likes } = req.body
    if (!req.token || !user) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = new Blog({ title, author, url, likes, user: req.user._id })
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    res.status(201).json(newBlog)
}
/**
 * @route : GET api/blogs/:id
 * @desc : Get Blog By Id
 * @access : Public
 */
const getBlogById = async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id).populate({
        path: 'user',
        select: ['name', 'username']
    })
    res.status(200).json(blog)
}
/**
 * @route : DELETE api/blogs/:id
 * @desc : delete Blog By Id
 * @access : Private
 */
const deleteBlogById = async (req, res) => {
    const user = req.user
    const blogId = req.params.id
    if (!user) {
        res.status(401).json({ error: 'unauthorized operation' })
    }
    const blog = await Blog.findById(blogId)
    if (user._id.toString() === blog.user.toString()) {
        await Blog.deleteOne({ _id: blogId })
        res.sendStatus(204).end()
    } else {
        res.status(401).json({ error: 'unauthorized operation' })
    }
}
/**
 * @route : PATCH api/blogs/:id
 * @desc : update Blog By Id
 * @access : Public
 */
const updateBlogById = async (req, res) => {
    const id = req.params.id
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body)
    res.status(200).json(updatedBlog)
}
module.exports = {
    getAllBloges,
    addNewBlog,
    getBlogById,
    deleteBlogById,
    updateBlogById
}
