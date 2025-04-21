import React from "react";
import "./styles/Pokedex.css";

function PokemonRow({ pokemon }) {
  if (!pokemon) {
    return null;
  }

  const id = pokemon.id ?? "N/A";
  const name = pokemon.name ?? "Unknown";
  const sprite = pokemon.sprite ?? "placeholder.png";
  const types = pokemon.types ?? [];

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <img src={sprite} alt={name} />
      </td>
      <td className="pokemon-types">
        {types.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </td>
    </tr>
  );
}

export default PokemonRow;
