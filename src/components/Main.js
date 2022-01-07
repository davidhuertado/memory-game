import React, { useState, useEffect } from 'react';

const url = 'https://pokeapi.co/api/v2/pokemon/';
const pokemons = [];

const Main = () => {
  const [arrayToRender, setArrayToRender] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState('0');
  const [currentScore, setCurrentScore] = useState(0);

  //Fetching after initial rendering
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
        alert(
          'You have to select each card only once. If you can select all 12 cards you win!'
        );
      } catch (error) {
        console.error(error);
      }
    };

    getResponse();
  }, []);

  //Effect after clicking card
  useEffect(() => {
    if (clickedCards.length > 0) {
      const shuffledPokemons = shuffle(pokemons);
      const renderedPokemons = renderPokemons(shuffledPokemons);
      setArrayToRender(renderedPokemons);
      console.log(clickedCards);
    }
  }, [clickedCards]);

  //Effect for winning
  useEffect(() => {
    if (currentScore === 12) {
      alert('You win!');
    }
  }, [currentScore]);

  const renderPokemons = (array) => {
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

  const checkClickedCards = (card) => {
    const isInclude = clickedCards.includes(card);

    if (!isInclude) {
      setCurrentScore(currentScore + 1);
      setClickedCards([...clickedCards, card]);
    } else {
      alert('You lose');
      setClickedCards([]);

      const shuffledPokemons = shuffle(pokemons);
      const renderedPokemons = renderPokemons(shuffledPokemons);
      setArrayToRender(renderedPokemons);

      if (currentScore > bestScore) setBestScore(currentScore);
      setCurrentScore(0);
    }
  };

  const handleParentPokemonClick = (e) => {
    const clickedCard = e.target.lastChild.textContent;
    checkClickedCards(clickedCard);
  };
  const handleChildClick = (e) => {
    e.stopPropagation(e);

    const clickedCard =
      e.target.parentElement.parentElement.lastChild.textContent;
    checkClickedCards(clickedCard);
  };
  const handleNameClick = (e) => {
    e.stopPropagation(e);

    const clickedCard = e.target.parentElement.lastChild.textContent;
    checkClickedCards(clickedCard);
  };

  return (
    <div className="main">
      <div className="scores">
        <div className="current score">
          <span>Current score: {currentScore}</span>
        </div>
        <div className="best score">
          <span>Best score: {bestScore}</span>
        </div>
      </div>
      <div className="grid">{arrayToRender}</div>
    </div>
  );
};

export default Main;
