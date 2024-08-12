const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Principal', 'Teacher', 'Student'], required: true },
    assignedClassroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' },  
});

// Pre-save middleware to hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();  // If password is not modified, move to the next middleware
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    next();  // Proceed to save the user
});

// Method to match provided password with the hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
