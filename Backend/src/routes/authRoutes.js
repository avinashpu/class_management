const express = require('express');
const { register, login, logout, updateUser, deleteUser } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login a user
router.post('/login', login);

// Logout a user
router.post('/logout', logout);

// Update a user (requires authorization)
router.put('/users/:id', updateUser);

// Delete a user (requires authorization)
router.delete('/users/:id', deleteUser);

module.exports = router;
