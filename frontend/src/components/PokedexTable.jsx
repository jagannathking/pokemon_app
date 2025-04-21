import React from 'react';
import PokemonRow from './PokemonRow';
import './styles/Pokedex.css'; // Import shared styles

function PokedexTable({ pokemonList }) {
  if (!pokemonList || pokemonList.length === 0) {
    return <p>No Pokémon to display.</p>;
  }

  return (
    <table className="pokedex-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Sprite</th>
          <th>Types</th>
        </tr>
      </thead>
      <tbody>
        {pokemonList.map((pokemon) => (
          // Use pokemon.id or pokemon.name as key, ensure uniqueness
          <PokemonRow key={pokemon.id || pokemon.name} pokemon={pokemon} />
        ))}
      </tbody>
    </table>
  );
}

export default PokedexTable;