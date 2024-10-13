// models/Comment.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event', // Liên kết với mô hình sự kiện
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Liên kết với mô hình người dùng
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Gán thời gian tạo tự động
    },
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
