'use strict';

const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

module.exports = function() {

    // Create a new comment
    router.post('/api/comments', async (req, res) => {
        try {
            const { text, user } = req.body;
            const newComment = new Comment({ text, user });
            const savedComment = await newComment.save();
            res.status(201).json(savedComment);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Get all comments
    router.get('/api/comments', async (req, res) => {
        try {
            const comments = await Comment.find();
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    return router;
}

