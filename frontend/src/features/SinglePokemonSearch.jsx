import React, { useState } from 'react';
import PokemonRow from '../components/PokemonRow';
import '../components/styles/Pokedex.css'; 

import { API_BASE_URL } from '../config';


// const API_BASE_URL = 'https://pokemon-app-six-lilac.vercel.app/api/pokemon'

function SinglePokemonSearch() {
  const [pokemonNameInput, setPokemonNameInput] = useState('');
  const [searchedPokemonData, setSearchedPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault(); 
    if (!pokemonNameInput.trim()) {
      setError('Please enter a Pokémon name.');
      return;
    }

    setLoading(true);
    setError(null);
    setSearchedPokemonData(null); 

    try {
      const response = await fetch(`${API_BASE_URL}/name/${pokemonNameInput.trim()}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Pokémon "${pokemonNameInput.trim()}" not found.`);
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSearchedPokemonData(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || 'Failed to fetch Pokémon data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokedex-section">
      <h2>Search Single Pokémon</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={pokemonNameInput}
          onChange={(e) => setPokemonNameInput(e.target.value)}
          placeholder="Enter Pokémon Name (e.g., Pikachu)"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !pokemonNameInput.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {searchedPokemonData && (
        <div>
          <h3>Result:</h3>
          <table className="pokedex-table"> {/* Reuse table structure */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Sprite</th>
                <th>Types</th>
              </tr>
            </thead>
            <tbody>
              <PokemonRow pokemon={searchedPokemonData} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SinglePokemonSearch;