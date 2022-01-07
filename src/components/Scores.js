import React from 'react';

const Scores = ({ currentScore, bestScore }) => {
  return (
    <div className="scores">
      <div className="current score">
        <span>Current score: {currentScore}</span>
      </div>
      <div className="best score">
        <span>Best score: {bestScore}</span>
      </div>
    </div>
  );
};

export default Scores;
