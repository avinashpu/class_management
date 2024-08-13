const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const APIResponse = require('../utils/ApiResponse');

// Register a new user (Teacher or Student)
const register = async (req, res) => {
    const { email, password, name, role } = req.body;
    console.log('Register Request Body:', req.body);

    try {
        // Check if the logged-in user is authorized to register a new user
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return APIResponse.unauthorizedResponse(res, 'Authorization header is missing or invalid');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const loggedInUser = await User.findById(decoded.id);
        console.log('Logged In User:', loggedInUser);

        // Check if logged-in user exists
        if (!loggedInUser) {
            return APIResponse.unauthorizedResponse(res, 'Logged in user not found');
        }

        // Allow only Principal to register Teachers and Students
        if (loggedInUser.role === 'Principal') {
            // Check if the role being created is valid
            if (role !== 'Teacher' && role !== 'Student') {
                return APIResponse.validationErrorResponse(res, 'Invalid role. Only Teacher or Student can be created');
            }
        } else if (loggedInUser.role === 'Teacher') {
            // Teachers can only register Students
            if (role !== 'Student') {
                return APIResponse.validationErrorResponse(res, 'Teachers can only register Students');
            }
        } else {
            return APIResponse.forbiddenResponse(res, 'Unauthorized role');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log('Existing User:', existingUser);

        if (existingUser) {
            return APIResponse.validationErrorResponse(res, 'User is already registered');
        }

        // Create new user if not exists
        const user = await User.create({ email, password, name, role });
        console.log('New User Created:', user);

        APIResponse.createdResponse(res, 'User created successfully', user);
    } catch (error) {
        console.error('Registration Error:', error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Login Request Body:', req.body);
    try {
        const user = await User.findOne({ email });
        console.log('User Found:', user);

        if (!user || !(await user.matchPassword(password))) {
            return APIResponse.validationErrorResponse(res, 'Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '48h'
        });
        console.log('Generated Token:', token);

        const data = {
            user: user,
            token: token,
            ipAddress: req.ip,
        };
        APIResponse.successResponse(res, 'User logged in successfully', data);
    } catch (error) {
        console.error("Login Error:", error); 
        APIResponse.errorResponse(res, error.message);
    }
};

// Logout a user
const logout = (req, res) => {
    try {
        APIResponse.successResponse(res, 'User logged out successfully');
    } catch (error) {
        console.error("Logout Error:", error); 
        APIResponse.errorResponse(res, error.message);
    }
};

module.exports = { register, login, logout };
