// controllers/timetableController.js

const Timetable = require('../models/Timetable.model');
const Classroom = require('../models/Classroom.model');
const APIResponse = require('../utils/ApiResponse');

// Create a timetable
const createTimetable = async (req, res) => {
    const { classroom, subject, startTime, endTime, day } = req.body;
    try {
        const classData = await Classroom.findById(classroom);
        if (!classData) {
            return APIResponse.validationErrorResponse(res, 'Classroom not found');
        }
        const dayData = classData.daysOfOperation.find(d => d.day === day);
        if (!dayData) {
            return APIResponse.validationErrorResponse(res, 'Invalid day for the classroom');
        }
        const classroomStartTime = new Date(`1970-01-01T${dayData.startTime}`);
        const classroomEndTime = new Date(`1970-01-01T${dayData.endTime}`);
        const periodStartTime = new Date(`1970-01-01T${startTime}`);
        const periodEndTime = new Date(`1970-01-01T${endTime}`);
        if (periodStartTime < classroomStartTime || periodEndTime > classroomEndTime) {
            return APIResponse.validationErrorResponse(res, 'Timetable period is out of classroom hours');
        }
        const overlappingPeriods = await Timetable.find({
            classroom,
            day,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
            ]
        });
        if (overlappingPeriods.length > 0) {
            return APIResponse.validationErrorResponse(res, 'Timetable period overlaps with existing periods');
        }
        const timetable = new Timetable({ classroom, subject, startTime, endTime, day });
        await timetable.save();
        APIResponse.createdResponse(res, 'Timetable created successfully', timetable);
    } catch (error) {
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = { createTimetable };
