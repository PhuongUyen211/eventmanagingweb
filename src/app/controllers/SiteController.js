const notification = require('../models/notification');

class SiteController {
    index(req, res, next) {
        console.log('Hello');
    }

    async getUserNotification(req, res){
        try {
            const Notifications = await notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
            res.json(Notifications);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi hệ thống!' });
        }
    }


}

module.exports = new SiteController();
