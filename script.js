document.addEventListener("DOMContentLoaded", () => {
    const playerNamesForm = document.getElementById('player-names-form');
    const gameScreen = document.getElementById('game-screen');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const currentPlayerText = document.getElementById('current-player');
    const gameBoard = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const winnerText = document.getElementById('winner');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('reset');

    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    playerNamesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        player1 = player1Input.value;
        player2 = player2Input.value;
        currentPlayer = player1;
        currentPlayerText.textContent = `${currentPlayer}'s Turn (X)`;
        document.getElementById('player-names-screen').classList.add('hidden');
        gameScreen.classList.remove('hidden');
    });

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        board[index] = currentPlayer === player1 ? 'X' : 'O';
        cell.textContent = board[index];

        if (checkWinner()) {
            gameActive = false;
            winnerText.textContent = `${currentPlayer} Wins!`;
            result.classList.remove('hidden');
        } else if (board.every(cell => cell !== '')) {
            winnerText.textContent = `It's a Draw!`;
            result.classList.remove('hidden');
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            currentPlayerText.textContent = `${currentPlayer}'s Turn (${currentPlayer === player1 ? 'X' : 'O'})`;
        }
    }

    function checkWinner() {
        return winConditions.some(condition => {
            return condition.every(index => {
                return board[index] !== '' && board[index] === board[condition[0]];
            });
        });
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = player1;
        currentPlayerText.textContent = `${currentPlayer}'s Turn (X)`;
        result.classList.add('hidden');
        gameActive = true;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
