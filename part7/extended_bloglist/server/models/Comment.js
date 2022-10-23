const { default: mongoose } = require('mongoose')

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Blog'
    }
})

commentSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
    }
})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
