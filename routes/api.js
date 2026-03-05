const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// @route   POST /api/entries
// @desc    Submit a new giveaway entry
// @access  Public
router.post('/entries', async (req, res) => {
    try {
        const { name, company, email, bottleneck, agree } = req.body;

        // Simple validation
        if (!name || !company || !email || !bottleneck || agree === undefined) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if user already entered
        const existingEntry = await Entry.findOne({ email });
        if (existingEntry) {
            return res.status(400).json({ message: 'An entry with this email already exists' });
        }

        const newEntry = new Entry({
            name,
            company,
            email,
            bottleneck,
            agree
        });

        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   GET /api/entries
// @desc    Get all entries (for admin purposes, potentially protect this later)
// @access  Public
router.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find().sort({ createdAt: -1 });
        res.json(entries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
