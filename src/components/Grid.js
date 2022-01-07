import React, { useState, useEffect } from 'react';

let pokemons = [];

const Grid = ({ clickedCards, playerLoseOrNot, url, firstPlay }) => {
  const [arrayToRender, setArrayToRender] = useState(null);

  //Fetching after initial rendering
  useEffect(() => {
    const getResponse = async () => {
      try {
        for (let i = 1; i <= 12; i++) {
          const response = await fetch(url + i, { mode: 'cors' });
          const data = await response.json();
          pushToPokemons(data);
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

  //Shuffling after initial render
  useEffect(() => {
    //Shuffling after first move
    if (clickedCards.length > 0) {
      const shuffledPokemons = shuffle(pokemons);
      const renderedPokemons = renderPokemons(shuffledPokemons);
      setArrayToRender(renderedPokemons);
      //Shuffling after losing
    } else if (!firstPlay && clickedCards.length === 0) {
      const shuffledPokemons = shuffle(pokemons);
      const renderedPokemons = renderPokemons(shuffledPokemons);
      setArrayToRender(renderedPokemons);
    }
  }, [clickedCards]);

  const pushToPokemons = (data) => {
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const spriteUrl = data.sprites.other['official-artwork'].front_default;
    const pokemonObject = { name: name, sprite: spriteUrl };
    pokemons.push(pokemonObject);
  };

  const checkClickedCards = (card) => {
    const isInclude = clickedCards.includes(card);
    if (!isInclude) {
      playerLoseOrNot(false, card);
    } else {
      playerLoseOrNot(true, card);
    }
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

  //Click Handlers
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

  return <div className="grid">{arrayToRender}</div>;
};

export default Grid;
