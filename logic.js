const blackCoin = "blackCoin";
const whiteCoin = "whiteCoin";

const cellElements = document.querySelectorAll("[data-square]");
const board = document.getElementById("board");

let whoseTurn;

let scoreB = 0
let scoreW = 0;

startGame();

function startGame() {
    whoseTurn = false;
    cellElements.forEach((cell) => {
         cell.classList.remove(blackCoin);
         cell.classList.remove(whiteCoin);
        cell.removeEventListener("click", handleClick);
            cellElements[27].classList.add("whiteCoin");
            cellElements[28].classList.add("blackCoin");
            cellElements[35].classList.add("blackCoin");
            cellElements[36].classList.add("whiteCoin");
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(clicked) {
    const cell = clicked.target;

    const currentClass = whoseTurn ? blackCoin : whiteCoin;

    placeMark(cell, currentClass);
    swapTurns();
    setBoardHoverClass();

}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    whoseTurn = !whoseTurn;
}

function setBoardHoverClass() {
    board.classList.remove(blackCoin);
    board.classList.remove(whiteCoin);

    if (whoseTurn) {
        board.classList.add()
    }
    else {
        board.classList.add()
    }
}