// routes/classroomRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { isPrincipal } = require('../middleware/roleMiddleware');
const { createClassroom, updateClassroom, deleteClassroom } = require('../controllers/classroomController');

// Route to create a classroom - Only Principal
router.post('/', protect, isPrincipal, createClassroom);

// Route to update a classroom - Only Principal
router.put('/:id', protect, isPrincipal, updateClassroom);

// Route to delete a classroom - Only Principal
router.delete('/:id', protect, isPrincipal, deleteClassroom);

module.exports = router;
