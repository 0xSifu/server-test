'use strict';

const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

module.exports = function() {

    // Create a new vote
    router.post('/api/votes', async (req, res) => {
        try {
            const { user, comment, liked } = req.body;
            const newVote = new Vote({ user, comment, liked });
            const savedVote = await newVote.save();
            res.status(201).json(savedVote);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

// Get all votes
    router.get('/api/votes', async (req, res) => {
        try {
            const votes = await Vote.find();
            res.json(votes);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    return router;
}



