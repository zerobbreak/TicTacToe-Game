// Game board state
let gameBoard = Array.from({ length: 9 }, () => "");
let currentPlayer = "X";
let gameStatus = "playing";

// DOM elements
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart-button");

// Add event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => makeMove(index));
});

// Restart button click event
restartButton.addEventListener("click", restartGame);

// Function to handle player moves
function makeMove(index) {
    if (gameBoard[index] === "" && gameStatus === "playing") {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWinConditions();
        checkDrawCondition();
        togglePlayer();
    }
}

// Function to toggle current player
function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to check win conditions
function checkWinConditions() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameStatus = "win";
            displayOutcome(`${currentPlayer} wins!`);
            return;
        }
    }
}

// Function to check draw condition
function checkDrawCondition() {
    if (!gameBoard.includes("") && gameStatus !== "win") {
        gameStatus = "draw";
        displayOutcome("It's a draw!");
    }
}

// Function to display game outcome
function displayOutcome(message) {
    const outcomeElement = document.createElement("div");
    outcomeElement.classList.add("outcome");
    outcomeElement.textContent = message;
    document.body.appendChild(outcomeElement);
}

// Function to restart the game
function restartGame() {
    gameBoard = Array.from({ length: 9 }, () => "");
    cells.forEach(cell => cell.textContent = "");
    gameStatus = "playing";
    currentPlayer = "X";
    const outcomeElement = document.querySelector(".outcome");
    if (outcomeElement) {
        outcomeElement.remove();
    }
}
