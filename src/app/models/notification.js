// models/Notification.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true }, // Người nhận thông báo
    eventId: { type: Schema.Types.ObjectId, ref: 'event', required: true }, // Sự kiện liên quan
    message: { type: String, required: true }, // Nội dung thông báo
    createdAt: { type: Date, default: Date.now }, // Thời gian thông báo được tạo
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
