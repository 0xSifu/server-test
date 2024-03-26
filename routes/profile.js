'use strict';

const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

const profiles = [
  {
    "id": 1,
    "name": "A Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
  }
];

module.exports = function() {

  // router.get('/*', function(req, res, next) {
  //   res.render('profile_template', {
  //     profile: profiles[0],
  //   });
  // });

  // Add a new profile with validation
  router.post('/api/add-profiles', async function(req, res, next) {
    try {
      const profile = new Profile(req.body);
      const savedProfile = await profile.save();
      res.status(201).json(savedProfile);
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Validation error', errors: err.errors });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });

  // Get a profile by ID with error handling
  router.get('/api/profiles/:id', async function(req, res, next) {
    try {
      const profile = await Profile.findById(req.params.id).lean();
      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.json(profile);
    } catch (err) {
      if (err.name === 'CastError') {
        res.status(400).json({ message: 'Invalid profile ID format' });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });

  // Define the route to return JSON data for all profiles with concurrency handling
  router.get('/api/get-all', async function(req, res, next) {
    try {
      const profiles = await Profile.find().lean(); // Fetch all profiles from MongoDB
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
}

