const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'chef'],
        default: 'user'
    },
    otp: {
        type: String,
        required: false, // OTP is not always present
    },
    otpExpiresAt: {
        type: Date, // Correct field name
        required: false, // Expiry date is not always needed
    }
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        console.log("Hashing password...");
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
