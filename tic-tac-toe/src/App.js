import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [gameState, setGameState] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [winnerMessage, setWinnerMessage] = useState('');

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleCellClick = (index) => {
    if (gameState[index] !== '' || !gameActive) return;

    const newGameState = [...gameState];
    newGameState[index] = currentPlayer;
    setGameState(newGameState);

    if (checkWinner(newGameState)) {
      setGameActive(false);
      setWinnerMessage(`Player ${currentPlayer} Wins!`);
    } else if (!newGameState.includes('')) {
      setGameActive(false);
      setWinnerMessage('Draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (state) => {
    return winningConditions.some(([a, b, c]) => {
      return state[a] && state[a] === state[b] && state[a] === state[c];
    });
  };

  const restartGame = () => {
    setGameState(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameActive(true);
    setWinnerMessage('');
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {gameState.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <button onClick={restartGame}>Restart Game</button>

      {winnerMessage && (
        <div className="popup">
          <div className="popup-content">
            <p>{winnerMessage}</p>
            <button onClick={restartGame}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;