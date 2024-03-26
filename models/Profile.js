const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String },
    description: String,
    mbti: String,
    enneagram: String,
    variant: String,
    tritype: Number,
    socionics: String,
    sloan: String,
    psyche: String,
    image: String
});

module.exports = mongoose.model('Profile', profileSchema);
