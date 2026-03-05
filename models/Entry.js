const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    bottleneck: {
        type: String,
        required: true
    },
    agree: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
