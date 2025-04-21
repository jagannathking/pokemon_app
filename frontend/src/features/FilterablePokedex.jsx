import React, { useState, useEffect, useMemo } from 'react';
import PokedexTable from '../components/PokedexTable';
import PokemonTypeSelection from '../components/PokemonTypeSelection';
import '../components/styles/Pokedex.css'; 

import { API_BASE_URL } from '../config';

// const API_BASE_URL = 'https://pokemon-app-six-lilac.vercel.app/api/pokemon'


function FilterablePokedex() {
  const [allPokemonData, setAllPokemonData] = useState([]);
  const [selectedType, setSelectedType] = useState(undefined); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  // Fetch all Pokemon data ONCE when the component mounts
  useEffect(() => {
    const fetchAllPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(API_BASE_URL); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAllPokemonData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || 'Failed to fetch Pokémon list.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []); 

  const filteredPokemonList = useMemo(() => {
    if (!selectedType) {
      return allPokemonData; 
    }
    return allPokemonData.filter(pokemon =>
      pokemon.types.includes(selectedType.toLowerCase()) 
    );
  }, [allPokemonData, selectedType]);


  const handleSelectType = (type) => {
    setSelectedType(type); 
  };

  return (
    <div className="pokedex-section">
      <h2>Filterable Pokédex</h2>

      <PokemonTypeSelection
        selectedType={selectedType}
        selectType={handleSelectType}
        disabled={loading || !!error} 
      />

      {loading && <div className="loading-message">Loading Pokémon list...</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Only render table if not loading and no error */}
      {!loading && !error && (
         <PokedexTable pokemonList={filteredPokemonList} />
      )}
    </div>
  );
}

export default FilterablePokedex;