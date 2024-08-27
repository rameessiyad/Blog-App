import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        requried: true
    },
    postId: {
        type: String,
        requried: true
    },
    userId: {
        type: String,
        requried: true
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;