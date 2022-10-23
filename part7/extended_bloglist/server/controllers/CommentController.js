const Blog = require('../models/Blogs')
const Comment = require('../models/Comment')

/**
 * @route : POST /api/blogs/:id/comments
 * @desc : Create new Comment
 * @access : Protected
 */

const addComment = async (req, res) => {
    const blogId = req.params.id
    if (!req.user) {
        return res.status(401).send('Unauthorized access')
    }
    const { content } = req.body
    const comment = new Comment({
        content,
        blogId,
        user: req.user._id
    })
    const newComment = await comment.save()
    const blog = await Blog.findById(blogId)
    blog.Comments = blog.Comments.concat(newComment.id)
    await blog.save()
    res.status(201).json({ status: true })
}
/**
 * @route : GET /api/blogs/:id/comments
 * @desc : Get All the Comments
 * @access : Protected
 */
const getAllComment = async (req, res) => {
    const blogId = req.params.id
    const comments = await Comment.find({ blogId })
    res.status(200).json(comments)
}

module.exports = {
    addComment,
    getAllComment
}
