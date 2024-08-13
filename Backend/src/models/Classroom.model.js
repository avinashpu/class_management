const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    startTime: {
        type: String,
        required: true // format should be HH:MM (24-hour format)
    },
    endTime: {
        type: String,
        required: true // format should be HH:MM (24-hour format)
    },
    days: {
        type: [String], // e.g., ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Teacher assigned to the classroom
        required: false
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Students assigned to the classroom
    }]
}, { timestamps: true });

module.exports = mongoose.model('Classroom', classroomSchema);
