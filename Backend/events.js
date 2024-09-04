const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    bookedStaff: {
        type: String,
        required: true,
    },
    eventName: {
        type: String,
        required: true,
    },
    eventDate: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
