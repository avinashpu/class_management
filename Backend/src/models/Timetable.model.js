const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    periods: [{
        day: {
            type: String, // e.g., 'Monday'
            required: true
        },
        startTime: {
            type: String, // format should be HH:MM
            required: true
        },
        endTime: {
            type: String, // format should be HH:MM
            required: true
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
