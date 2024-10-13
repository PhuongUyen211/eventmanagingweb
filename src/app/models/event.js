const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const event = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        address: { type: String, required: true },
        topic: { type: String },
        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        date: { type: Date, required: true },
        image: { data: Buffer, contentType: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('event', event);
