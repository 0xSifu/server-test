'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');

module.exports = function() {

    router.post('/users', async (req, res) => {
        try {
            const { name } = req.body;
            const newUser = new User({ name });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    // Get all users
    router.get('/users', async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    });

    return router;
}
