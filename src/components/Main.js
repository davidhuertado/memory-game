import React, { useState, useEffect } from 'react';
import Scores from './Scores';
import Grid from './Grid';

const url = 'https://pokeapi.co/api/v2/pokemon/';

const Main = () => {
  const [clickedCards, setClickedCards] = useState([]);
  const [bestScore, setBestScore] = useState('0');
  const [currentScore, setCurrentScore] = useState(0);
  const [firstPlay, setFirstPlay] = useState(true);

  //Effect for winning
  useEffect(() => {
    if (clickedCards.length === 12) {
      setClickedCards([]);
      alert('You win!');
      if (currentScore > bestScore) setBestScore(currentScore);
      setCurrentScore(0);
      setFirstPlay(false);
    }
  }, [clickedCards]);

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

  const playerLoseOrNot = (lose, card) => {
    if (lose) {
      alert('You lose');
      setFirstPlay(false);

      setClickedCards([]);
      if (currentScore > bestScore) setBestScore(currentScore);
      setCurrentScore(0);
    } else {
      setCurrentScore(currentScore + 1);

      setClickedCards([...clickedCards, card]);
    }
  };

  return (
    <div className="main">
      <Scores currentScore={currentScore} bestScore={bestScore} />

      <Grid
        clickedCards={clickedCards}
        shuffle={shuffle}
        playerLoseOrNot={playerLoseOrNot}
        url={url}
        firstPlay={firstPlay}
      />
    </div>
  );
};

export default Main;
