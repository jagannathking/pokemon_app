import React from 'react';
import './styles/Pokedex.css';

const POKEMON_TYPES = [
  'grass', 'poison', 'fire', 'water', 'electric', 'normal', 'flying',
];

function PokemonTypeSelection({ selectedType, selectType, disabled }) {
  return (
    <div className="type-selection">
      <button
        onClick={() => selectType(undefined)} // Pass undefined for 'All'
        className={!selectedType ? 'selected' : ''}
        disabled={disabled}
      >
        All Types
      </button>
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => selectType(type)}
          className={selectedType === type ? 'selected' : ''}
          disabled={disabled}
          style={{textTransform: 'capitalize'}} 
        >
          {type}
        </button>
      ))}
    </div>
  );
}

export default PokemonTypeSelection;