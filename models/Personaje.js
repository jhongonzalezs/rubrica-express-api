const mongoose = require('mongoose');

const personajeSchema = new mongoose.Schema({
    id: Number,
    image: String,
    name: String,
    nickname: String,
    age: String,
    crew: String,
    rank: String,
    currentBounty: String,
});

module.exports = mongoose.model('Personaje', personajeSchema);
