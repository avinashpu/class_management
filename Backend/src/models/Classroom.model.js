// models/Classroom.model.js

const mongoose = require('mongoose');

const DayTimeSchema = new mongoose.Schema({
    day: { type: String, required: true }, // e.g., Monday
    startTime: { type: String, required: true }, // e.g., "12:00 PM"
    endTime: { type: String, required: true } // e.g., "06:00 PM"
});

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysOfOperation: [DayTimeSchema]
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
