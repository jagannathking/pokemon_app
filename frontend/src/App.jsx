import React from 'react';
import SinglePokemonSearch from './features/SinglePokemonSearch';
import BulkPokemonSearch from './features/BulkPokemonSearch';
import FilterablePokedex from './features/FilterablePokedex';
import './components/styles/Pokedex.css'; 

function App() {
  return (
    <div className="pokedex-container">
      <h1 style={{textAlign: 'center'}}>Pokedex</h1>

      {/* Render the component for Part 1 */}
      <SinglePokemonSearch />

      {/* Render the component for Part 2 */}
      <BulkPokemonSearch />

      {/* Render the component for Part 3 */}
      <FilterablePokedex />

    </div>
  );
}

export default App;