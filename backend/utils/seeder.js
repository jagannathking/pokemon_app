// utils/seeder.js
const Pokemon = require('../models/pokemon.model'); 

const seedDatabase = async () => {
    try {
        const count = await Pokemon.countDocuments();

        if (count === 0) {
            console.log('Database empty, adding sample Pokemon...');
            const samplePokemon = [
                { id: 1, name: "Bulbasaur", types: ["grass", "poison"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
                { id: 4, name: "Charmander", types: ["fire"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
                { id: 7, name: "Squirtle", types: ["water"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
                { id: 25, name: "Pikachu", types: ["electric"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
                { id: 6, name: "Charizard", types: ["fire", "flying"], sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
            ];

            for (const pkmn of samplePokemon) {
                await Pokemon.findOneAndUpdate(
                    { id: pkmn.id },
                    pkmn,
                    {
                        upsert: true,
                        new: true,
                        setDefaultsOnInsert: true
                    }
                );
            }
            console.log('Sample Pokemon added/updated!');
        } else {
            console.log('Database already contains Pokemon. Seeding skipped.');
        }
    } catch (error) {
        console.error('Error during database seeding:', error.message);
    }
};

module.exports = {
    seedDatabase
};