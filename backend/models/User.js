const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ['admin', 'manager', 'employee'],
            default: 'employee'
        },

        // tokens for auth + password reset flow
        refreshToken: String,
        resetToken: String,
        resetTokenExp: Date
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);
