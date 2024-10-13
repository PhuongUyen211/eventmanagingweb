const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participation = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true,
    },
});

module.exports = mongoose.model('participation', participation);
