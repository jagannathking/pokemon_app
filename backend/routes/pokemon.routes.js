const express = require('express');

const {
    getPokemonByName,
    getPokemonBulk,
    getAllPokemon
} = require('../controllers/pokemon.controller');

const router = express.Router();

router.get('/name/:name', getPokemonByName);
router.post('/bulk', getPokemonBulk);
router.get('/', getAllPokemon);

module.exports = router;