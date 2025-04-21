import React, { useState } from "react";
import PokedexTable from "../components/PokedexTable";
import "../components/styles/Pokedex.css"; 
import { API_BASE_URL } from '../config';

// const API_BASE_URL = 'https://pokemon-app-six-lilac.vercel.app/api/pokemon'

function BulkPokemonSearch() {
  const [pokemonNamesInput, setPokemonNamesInput] = useState("");
  const [pokemonListData, setPokemonListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const namesArray = pokemonNamesInput
      .split(",") // Split by comma
      .map((name) => name.trim()) // Trim whitespace
      .filter((name) => name); // Remove empty strings

    if (namesArray.length === 0) {
      setError("Please enter at least one Pokémon name, separated by commas.");
      setPokemonListData([]);
      return;
    }

    setLoading(true);
    setError(null);
    setPokemonListData([]); // Clear previous results

    try {
      const response = await fetch(`${API_BASE_URL}/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ names: namesArray }), // Send names in the body
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(
          errorData.message || `HTTP error! Status: ${response.status}`
        );
      }

      const data = await response.json();
      setPokemonListData(data);
      if (data.length !== namesArray.length) {
        setError("Note: Some requested Pokémon might not have been found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pokedex-section">
      <h2>Search Multiple Pokémon</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <textarea
          value={pokemonNamesInput}
          onChange={(e) => setPokemonNamesInput(e.target.value)}
          placeholder="Enter Pokémon Names, separated by commas (e.g., Bulbasaur, Charizard, Squirtle)"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !pokemonNamesInput.trim()}>
          {loading ? "Searching..." : "Search Bulk"}
        </button>
      </form>

      {loading && <div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {/* Only show table if data has been loaded successfully */}
      {pokemonListData.length > 0 && (
        <div>
          <h3>Results:</h3>
          <PokedexTable pokemonList={pokemonListData} />
        </div>
      )}
      {/* Show message if search was done but no results came back */}
      {!loading &&
        !error &&
        pokemonListData.length === 0 &&
        pokemonNamesInput.trim() && (
          <p>No matching Pokémon found for the provided names.</p>
        )}
    </div>
  );
}

export default BulkPokemonSearch;
