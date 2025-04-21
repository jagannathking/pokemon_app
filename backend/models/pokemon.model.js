const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true, index: true },
    types: { type: [String], required: true },
    sprite: { type: String, required: true },
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Use module.exports for default export equivalent
module.exports = Pokemon;