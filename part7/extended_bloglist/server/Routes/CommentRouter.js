const {
    getAllComment,
    addComment
} = require('../controllers/CommentController')

const commentRoutes = require('express').Router({ mergeParams: true })

commentRoutes.route('/').get(getAllComment).post(addComment)

module.exports = commentRoutes
