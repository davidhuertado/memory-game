import React, { useState, useEffect } from 'react';

const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];
const Main = () => {
  const [arrayToRender, setArrayToRender] = useState(null);
  const [clickedCards, setClickedCards] = useState('');
  useEffect(() => {
    const getResponse = async () => {
      try {
        for (let i = 1; i <= 12; i++) {
          const response = await fetch(url + i, { mode: 'cors' });
          const data = await response.json();
          pushToArray(data);
        }

        const shuffledPokemons = shuffle(pokemons);
        const renderedPokemons = renderPokemons(shuffledPokemons);
        setArrayToRender(renderedPokemons);
      } catch (error) {
        console.error(error);
      }
    };

    getResponse();
  }, []);

  useEffect(() => {
    console.log(clickedCards);
    if (clickedCards !== '') {
      console.log(pokemons);
      const shuffledPokemons = shuffle(pokemons);
      const renderedPokemons = renderPokemons(shuffledPokemons);
      setArrayToRender(renderedPokemons);
    }
  }, [clickedCards]);

  const renderPokemons = (array) => {
    console.log(array);
    return array.map((element) => {
      return (
        <div
          className="pokemon"
          key={element.name}
          onClick={(key) => handleParentPokemonClick(key)}
        >
          <div className="sprite-container" onClick={handleChildClick}>
            <img className="sprite" src={element.sprite} />
          </div>
          <span className="name" onClick={handleNameClick}>
            {element.name}
          </span>
        </div>
      );
    });
  };

  const pushToArray = (data) => {
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const spriteUrl = data.sprites.other['official-artwork'].front_default;
    const pokemonObject = { name: name, sprite: spriteUrl };
    pokemons.push(pokemonObject);
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const checkClickedCars = (card) => {
    const isInclude = clickedCards.includes(card);
    console.log(arrayToRender);
    console.log(pokemons);

    if (!isInclude) {
      setClickedCards([...clickedCards, card]);
    } else {
      alert('Lose');
    }
  };

  const handleParentPokemonClick = (e) => {
    console.log(e.target.lastChild.textContent);
    const clickedCard = e.target.lastChild.textContent;
    checkClickedCars(clickedCard);
  };
  const handleChildClick = (e) => {
    e.stopPropagation(e);
    console.log(e.target.parentElement.parentElement.lastChild.textContent);
    const clickedCard =
      e.target.parentElement.parentElement.lastChild.textContent;
    checkClickedCars(clickedCard);
  };
  const handleNameClick = (e) => {
    e.stopPropagation(e);
    console.log(e.target.parentElement.lastChild.textContent);
    const clickedCard = e.target.parentElement.lastChild.textContent;
    checkClickedCars(clickedCard);
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
