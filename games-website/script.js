// Function to load the selected game
function showGame(game) {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = ""; // Clear area
    switch (game) {
        case 'rps':
            rockPaperScissors(gameArea);
            break;
        case 'ht':
            headTails(gameArea);
            break;
        case 'ng':
            numberGuessing(gameArea);
            break;
        case 'tt':
            ticTacToe(gameArea);
            break;
        default:
            gameArea.innerHTML = `<p>Game not found!</p>`;
    }
}

// ROCK-PAPER-SCISSORS
function rockPaperScissors(gameArea) {
    gameArea.innerHTML = `
        <h2>Rock-Paper-Scissors</h2>
        <p>Choose your move:</p>
        <button onclick="playRPS('Rock')">Rock</button>
        <button onclick="playRPS('Paper')">Paper</button>
        <button onclick="playRPS('Scissors')">Scissors</button>
        <div id="rps-result"></div>
    `;
}

function playRPS(userChoice) {
    const options = ['Rock', 'Paper', 'Scissors'];
    const computerChoice = options[Math.floor(Math.random() * 3)];
    let result;

    if (userChoice === computerChoice) result = "It's a Draw!";
    else if (
        (userChoice === 'Rock' && computerChoice === 'Scissors') ||
        (userChoice === 'Scissors' && computerChoice === 'Paper') ||
        (userChoice === 'Paper' && computerChoice === 'Rock')
    ) result = "You Won!";
    else result = "You Lost!";

    document.getElementById('rps-result').innerHTML = `
        <p>You chose: <b>${userChoice}</b></p>
        <p>Computer chose: <b>${computerChoice}</b></p>
        <h3>${result}</h3>
    `;
}

// HEAD-TAILS
function headTails(gameArea) {
    gameArea.innerHTML = `
        <h2>Head or Tail</h2>
        <p>Choose:</p>
        <button onclick="playHT('Head')">Head</button>
        <button onclick="playHT('Tail')">Tail</button>
        <div id="ht-result"></div>
    `;
}

function playHT(userChoice) {
    const options = ['Head', 'Tail'];
    const result = options[Math.floor(Math.random() * 2)];
    const outcome = userChoice === result ? "You Won!" : "You Lost!";

    document.getElementById('ht-result').innerHTML = `
        <p>Your choice: <b>${userChoice}</b></p>
        <p>Result: <b>${result}</b></p>
        <h3>${outcome}</h3>
    `;
}

// NUMBER GUESSING GAME
function numberGuessing(gameArea) {
    const number = Math.floor(Math.random() * 100) + 1;
    gameArea.innerHTML = `
        <h2>Number Guessing Game</h2>
        <p>Guess a number between 1 and 100:</p>
        <input type="number" id="guess-input" min="1" max="100" placeholder="Enter your guess" />
        <button onclick="checkNumber(${number})">Submit</button>
        <div id="ng-result"></div>
    `;
}

function checkNumber(correctNumber) {
    const userGuess = parseInt(document.getElementById('guess-input').value);
    const resultArea = document.getElementById('ng-result');

    if (isNaN(userGuess)) {
        resultArea.innerHTML = `<p>Please enter a valid number!</p>`;
        return;
    }

    if (userGuess < correctNumber) {
        resultArea.innerHTML = `<p>Too low! Try again.</p>`;
    } else if (userGuess > correctNumber) {
        resultArea.innerHTML = `<p>Too high! Try again.</p>`;
    } else {
        resultArea.innerHTML = `
            <h3>Congratulations!</h3>
            <p>You guessed the number correctly: <b>${correctNumber}</b></p>
        `;
    }
}

// TIC-TAC-TOE GAME
function ticTacToe(gameArea) {
    let currentPlayer = 'X';
    const board = Array(9).fill(null);

    gameArea.innerHTML = `
        <h2>Tic-Tac-Toe</h2>
        <div class="tic-tac-toe" id="tic-tac-toe-board"></div>
        <p id="tt-message">Current Player: <b>${currentPlayer}</b></p>
    `;

    const boardContainer = document.getElementById('tic-tac-toe-board');
    board.forEach((_, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        boardContainer.appendChild(cell);
    });

    function makeMove(index) {
        if (board[index] || checkWinner()) return;
        board[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;

        if (checkWinner()) {
            document.getElementById('tt-message').innerHTML = `<b>${currentPlayer} Wins!</b>`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('tt-message').innerHTML = `Current Player: <b>${currentPlayer}</b>`;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winPatterns.some(pattern => 
            board[pattern[0]] && board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]
        );
    }
}
