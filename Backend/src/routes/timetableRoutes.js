// routes/timetableRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isTeacher } = require('../middleware/roleMiddleware');
const { createTimetable } = require('../controllers/timetableController');

// Route to create a timetable - Only Teacher
router.post('/', protect, isTeacher, createTimetable);

module.exports = router;
