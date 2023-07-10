const blackCoin = "blackCoin";
const whiteCoin = "whiteCoin";
const cellElements = document.querySelectorAll("[data-square]");
const boardRowsColumns = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30, 31],
  [32, 33, 34, 35, 36, 37, 38, 39],
  [40, 41, 42, 43, 44, 45, 46, 47],
  [48, 49, 50, 51, 52, 53, 54, 55],
  [56, 57, 58, 59, 60, 61, 62, 63],
];
const edgeOfaBoard = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 55, 56, 57,
  58, 59, 60, 61, 62, 63,
];

let whoseTurn;
let scoreB = 0;
let scoreW = 0;

startGame();

function startGame() {
    whoseTurn = false;
        cellElements[27].classList.add("whiteCoin");
        cellElements[28].classList.add("blackCoin");
        cellElements[35].classList.add("blackCoin");
        cellElements[36].classList.add("whiteCoin");
  cellElements.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
//   setBoardHoverClass();
}

function handleClick(clicked) {
  const cell = clicked.target;
    cellElements[27].removeEventListener("click", handleClick);
    cellElements[28].removeEventListener("click", handleClick);
    cellElements[35].removeEventListener("click", handleClick);
    cellElements[36].removeEventListener("click", handleClick);
    const currentClass = whoseTurn ? blackCoin : whiteCoin;
    let index = getIndex(cell);
    console.log(hasNeighbor(index));
    if (hasNeighbor(index)) {
        placeMark(cell, currentClass);
        swapTurns();
    }
//   setBoardHoverClass();

}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  whoseTurn = !whoseTurn;
}
function getIndex(clicked) {
  let idx = [].indexOf.call(cellElements, clicked);
  console.log(idx);
  return idx;
}
function hasNeighbor(cellIndex) {
  const cellRow = Math.floor(cellIndex / 8);
  const cellColumn = cellIndex % 8;

  // Define the directions to check for neighbors
  const directions = [
    { row: -1, column: -1 }, // top left
    { row: -1, column: 0 }, // top
    { row: -1, column: 1 }, // top right
    { row: 0, column: -1 }, // left
    { row: 0, column: 1 }, // right
    { row: 1, column: -1 }, // bottom left
    { row: 1, column: 0 }, // bottom
    { row: 1, column: 1 }, // bottom right
  ];

  for(const direction of directions) {
    const neighborRow = cellRow + direction.row;
    const neighborColumn = cellColumn + direction.column;
    const neighborIndex = neighborRow * 8 + neighborColumn;

    // Check if the neighbor is within the board boundaries
    if(
      neighborRow >= 0 &&
      neighborRow < 8 &&
      neighborColumn >= 0 &&
      neighborColumn < 8
    ) {
      const neighborCell = cellElements[neighborIndex];
      // Check if the neighbor cell is occupied by a coin
      if (
        neighborCell.classList.contains(blackCoin) ||
        neighborCell.classList.contains(whiteCoin)
      ) {
        return true;
      }
    }
  }
  return false;
}
function findLastNeighbor(
  cellIndex,
  currentClass,
  directionRow,
  directionColumn
) {
  const row = Math.floor(cellIndex / 8);
  const column = cellIndex % 8;

  const neighborRow = row + directionRow;
  const neighborColumn = column + directionColumn;
  const neighborIndex = neighborRow * 8 + neighborColumn;

  // Check if the neighbor is within the board boundaries
  if (
    neighborRow >= 0 &&
    neighborRow < 8 &&
    neighborColumn >= 0 &&
    neighborColumn < 8
  ) {
    const neighborCell = cellElements[neighborIndex];

    // Check if the neighbor cell is occupied by a coin of the opposite color
    if (
      neighborCell.classList.contains(
        currentClass === blackCoin ? whiteCoin : blackCoin
      )
    ) {
      return findLastNeighbor(
        neighborIndex,
        currentClass,
        directionRow,
        directionColumn
      );
    }
  }

  return cellIndex;
}