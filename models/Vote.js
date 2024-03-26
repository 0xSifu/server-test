// models/Vote.js

const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    liked: { type: Boolean, required: true },
});

module.exports = mongoose.model('Vote', voteSchema);
