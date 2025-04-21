import Pokemon from '../models/pokemon.model.js'

//  error responses 
export const sendError = (res, statusCode, message) => {
    console.error("API Error:", message);
    return res.status(statusCode).json({ message });
};

// Controller function for: GET /api/pokemon/name/:name
export const getPokemonByName = async (req, res) => {
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

// Controller function for: POST /api/pokemon/bulk
export const getPokemonBulk = async (req, res) => {
  try {
    const names = req.body.names;
    if (!Array.isArray(names) || names.length === 0) {
      return sendError(res, 400, 'Request body must contain a non-empty "names" array.');
    }

    const nameRegexes = names.map(name => new RegExp(`^${name}$`, 'i'));
    const pokemonArray = await Pokemon.find({ name: { $in: nameRegexes } });

    res.json(pokemonArray); // Send back the array of found Pokemon
  } catch (error) {
    sendError(res, 500, `Server error fetching multiple Pokemon: ${error.message}`);
  }
};

// Controller function for: GET /api/pokemon?type=grass (or just /api/pokemon)
export const getAllPokemon = async (req, res) => {
  try {
    const filterType = req.query.type;
    let query = {}; 

    if (filterType) {
      query = { types: { $regex: new RegExp(`^${filterType}$`, 'i') } };
    }

    const pokemonList = await Pokemon.find(query).sort({ id: 1 }); // Sort by ID
    res.json(pokemonList); // Send back the list
  } catch (error) {
    sendError(res, 500, `Server error fetching Pokemon list: ${error.message}`);
  }
};

