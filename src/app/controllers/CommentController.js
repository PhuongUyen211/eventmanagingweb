const event = require('../models/event');
const comment = require('../models/comment');
const authenticate = require('../../middleware/authenticate');

class CommentController {
    async addComment(req, res) {
        try {
            const Event = await event.findById(req.params.id);
            if (!Event) {
                return res
                    .status(404)
                    .json({ message: 'Sự kiện không tồn tại.' });
            }

            if (!req.body.content || req.body.content.trim() === '') {
                return res
                    .status(400)
                    .json({
                        message: 'Nội dung bình luận không được để trống.',
                    });
            }

            const Comment = new comment({
                eventId: req.params.id,
                content: req.body.content,
                userId: req.user.id,
            });

            await Comment.save();

            res.status(201).json(Comment);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi hệ thống thêm bình luận!' });
        }
    }

    async getComment(req, res) {
        try {
            const Comments = await comment
                .find({ eventId: req.params.id })
                .populate('userId', 'name');
            res.status(200).json(Comments);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống lấy bình luận!' });
        }
    }
}

module.exports = new CommentController();
