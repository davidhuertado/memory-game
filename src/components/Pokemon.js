import React from 'react';

const Pokemon = ({
  handleParentPokemonClick,
  handleChildClick,
  handleNameClick,
  element,
}) => {
  return (
    <div className="pokemon" onClick={(key) => handleParentPokemonClick(key)}>
      <div className="sprite-container" onClick={handleChildClick}>
        <img className="sprite" src={element.sprite} />
      </div>
      <span className="name" onClick={handleNameClick}>
        {element.name}
      </span>
    </div>
  );
};

export default Pokemon;
