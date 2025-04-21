import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true, index: true }, // Added index for faster name lookups
    types: { type: [String], required: true }, // Array of strings
    sprite: { type: String, required: true },   // URL string
  });
  
  // Create and export the model
  const Pokemon = mongoose.model('Pokemon', pokemonSchema);
  
  export default Pokemon;