const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
});

module.exports = mongoose.model('Participation', ParticipationSchema);
