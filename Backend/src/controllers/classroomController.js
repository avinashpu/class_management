// controllers/classroomController.js

const Classroom = require('../models/Classroom.model');
const APIResponse = require('../utils/ApiResponse');

// Create a classroom
const createClassroom = async (req, res) => {
    const { name, daysOfOperation } = req.body;
    console.log('Create Classroom Request Body:', req.body);

    try {
        // Check if classroom already exists
        const existingClassroom = await Classroom.findOne({ name });
        console.log('Existing Classroom:', existingClassroom);

        if (existingClassroom) {
            return APIResponse.validationErrorResponse(res, 'Classroom already exists');
        }

        // Create new classroom if not exists
        const classroom = await Classroom.create({ name, daysOfOperation });
        console.log('New Classroom Created:', classroom);

        APIResponse.createdResponse(res, 'Classroom created successfully', classroom);
    } catch (error) {
        console.error('Create Classroom Error:', error);
        APIResponse.errorResponse(res, error.message);
    }
};

// Update a classroom
const updateClassroom = async (req, res) => {
    const { id } = req.params;
    const { name, daysOfOperation } = req.body;
    console.log('Update Classroom Request Body:', req.body);

    try {
        // Check if classroom exists
        const classroom = await Classroom.findById(id);
        console.log('Classroom Found:', classroom);

        if (!classroom) {
            return APIResponse.validationErrorResponse(res, 'Classroom not found');
        }

        // Update classroom details
        const updatedClassroom = await Classroom.findByIdAndUpdate(id, { name, daysOfOperation }, { new: true });
        console.log('Updated Classroom:', updatedClassroom);

        APIResponse.successResponse(res, 'Classroom updated successfully', updatedClassroom);
    } catch (error) {
        console.error('Update Classroom Error:', error);
        APIResponse.errorResponse(res, error.message);
    }
};

// Delete a classroom
const deleteClassroom = async (req, res) => {
    const { id } = req.params;
    console.log('Delete Classroom Request Body:', req.params);

    try {
        // Check if classroom exists
        const classroom = await Classroom.findById(id);
        console.log('Classroom Found:', classroom);

        if (!classroom) {
            return APIResponse.validationErrorResponse(res, 'Classroom not found');
        }

        // Delete classroom
        await Classroom.findByIdAndDelete(id);
        APIResponse.successResponse(res, 'Classroom deleted successfully');
    } catch (error) {
        console.error('Delete Classroom Error:', error);
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = { createClassroom, updateClassroom, deleteClassroom };
