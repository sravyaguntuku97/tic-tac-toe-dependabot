document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const restartBtn = document.getElementById('restartBtn');
    const popup = document.getElementById('popup');
    const message = document.getElementById('message');
    const closePopup = document.getElementById('closePopup');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        if (checkWinner()) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} Wins!`;
            popup.style.display = 'flex';
        } else if (!gameState.includes('')) {
            gameActive = false;
            message.textContent = 'Draw!';
            popup.style.display = 'flex';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    };

    const checkWinner = () => {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    };

    const restartGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => (cell.textContent = ''));
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
        restartGame();
    });
});
