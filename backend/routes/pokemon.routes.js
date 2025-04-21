import express from 'express'

import {getPokemonByName, getPokemonBulk, getAllPokemon} from '../controllers/pokemon.controller.js'


const router = express.Router();


router.get('/name/:name', getPokemonByName); 
router.post('/bulk', getPokemonBulk);         
router.get('/', getAllPokemon);             


export default router;