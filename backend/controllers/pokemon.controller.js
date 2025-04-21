const Pokemon = require('../models/pokemon.model'); 

const sendError = (res, statusCode, message) => {
    console.error("API Error:", message);
    return res.status(statusCode).json({ message });
};

const getPokemonByName = async (req, res) => {
    try {
        const pokemonName = req.params.name;
        const pokemon = await Pokemon.findOne({ name: { $regex: new RegExp(`^${pokemonName}$`, 'i') } });

        if (!pokemon) {
            return sendError(res, 404, 'Pokemon not found');
        }
        res.json(pokemon);
    } catch (error) {
        sendError(res, 500, `Server error fetching Pokemon by name: ${error.message}`);
    }
};

const getPokemonBulk = async (req, res) => {
    try {
        const names = req.body.names;
        if (!Array.isArray(names) || names.length === 0) {
            return sendError(res, 400, 'Request body must contain a non-empty "names" array.');
        }

        const nameRegexes = names.map(name => new RegExp(`^${name}$`, 'i'));
        const pokemonArray = await Pokemon.find({ name: { $in: nameRegexes } });

        res.json(pokemonArray);
    } catch (error) {
        sendError(res, 500, `Server error fetching multiple Pokemon: ${error.message}`);
    }
};

const getAllPokemon = async (req, res) => {
    try {
        const filterType = req.query.type;
        let query = {};

        if (filterType) {
            query = { types: { $regex: new RegExp(`^${filterType}$`, 'i') } };
        }

        const pokemonList = await Pokemon.find(query).sort({ id: 1 });
        res.json(pokemonList);
    } catch (error) {
        sendError(res, 500, `Server error fetching Pokemon list: ${error.message}`);
    }
};

module.exports = {
    sendError,
    getPokemonByName,
    getPokemonBulk,
    getAllPokemon
};