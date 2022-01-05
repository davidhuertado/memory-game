import React, { useState, useEffect } from 'react';

const url = 'https://pokeapi.co/api/v2/pokemon/';

const Main = () => {
  let pokemons = [];
  const [arrayToRender, setArrayToRender] = useState(null);

  useEffect(() => {
    const getResponse = async () => {
      try {
        for (let i = 1; i <= 12; i++) {
          const response = await fetch(url + i, { mode: 'cors' });
          const data = await response.json();
          const name = data.name;
          const spriteUrl =
            data.sprites.other['official-artwork'].front_default;
          const pokemonObject = { name: name, sprite: spriteUrl };
          pokemons.push(pokemonObject);
        }
        const renderedPokemons = pokemons.map((pokemon) => {
          return (
            <div className="pokemon" key={pokemon.name}>
              <div className="sprite-container">
                <img className="sprite" src={pokemon.sprite} />
              </div>
              <span className="name">{pokemon.name}</span>
            </div>
          );
        });
        console.log(renderedPokemons);

        setArrayToRender(renderedPokemons);
      } catch (error) {
        console.error(error);
      }
    };

    getResponse();

    // const renderedPokemons = pokemons.map((pokemon) => {
    //   console.log(pokemon);
    //   return (
    //     <div className="pokemon" key={pokemon.name}>
    //       <div className="sprite-container">
    //         <img className="sprite" src={pokemon.sprite} />
    //       </div>
    //       <span className="name">{pokemon.name}</span>
    //     </div>
    //   );
    // });

    // setArrayToRender(renderedPokemons);

    // console.log(renderedPokemons);
  }, []);

  const pushToArray = (data) => {
    const name = data.name;
    const spriteUrl = data.sprites.other['official-artwork'].front_default;
    const pokemonObject = { name: name, sprite: spriteUrl };
    pokemons.push(pokemonObject);
  };

  return (
    <div className="main">
      <div className="scores">
        <div className="current score">
          <span>Current score: 2</span>
        </div>
        <div className="best score">
          <span>Best score: 5</span>
        </div>
      </div>
      <div className="grid">{arrayToRender}</div>
    </div>
  );
};

export default Main;
