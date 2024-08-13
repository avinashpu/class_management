const express = require('express');
const { createClassroom, assignTeacher, assignStudents } = require('../controllers/classroomController');

const router = express.Router();

router.post('/create', createClassroom);
router.post('/assignteacher', assignTeacher);
router.post('/assignstudents', assignStudents);

module.exports = router;
