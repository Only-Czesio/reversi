const blackCoin = "blackCoin";
const whiteCoin = "whiteCoin";
const cells = document.querySelectorAll("[data-square]");
const board = document.getElementById("board");
 
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

let whoseTurn;
let scoreB = 0;
let scoreW = 0;

let matrix = [];

function listToMatrix(list, size) {
  let i, k;
  for (i = 0, k = -1; i < list.length; i++) {
    if (i % size === 0) {
      k++;
      matrix[k] = [];
    }
    matrix[k].push(list[i]);
  }
  return matrix;
}



console.log(listToMatrix(cells, 8))

function startGame() {
  listToMatrix(cells, 8);
  whoseTurn = false;
  matrix[3][3].classList.add("whiteCoin");
  matrix[3][4].classList.add("blackCoin");
  matrix[4][3].classList.add("blackCoin");
  matrix[4][4].classList.add("whiteCoin");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });

    setBoardHoverClass();
}

function handleClick(clicked) {
  const cell = clicked.target;
    matrix[3][3].removeEventListener("click", handleClick);
    matrix[3][4].removeEventListener("click", handleClick);
    matrix[4][3].removeEventListener("click", handleClick);
    matrix[4][4].removeEventListener("click", handleClick);
  cell.removeEventListener("click", handleClick);
  const currentClass = whoseTurn ? blackCoin : whiteCoin;
  let index = getIndex(cell);
  console.log(hasNeighbor(index));
  if (hasNeighbor(index) && captureOpponentCoins(getIndex(cell),currentClass)) {
    placeMark(cell, currentClass);
    swapTurns();
  }
  if (findLastNeighborClass(cell, currentClass) === currentClass) {
    captureOpponentCoins(cell, currentClass);
  }
    setBoardHoverClass();
}
function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if(whoseTurn) {
    board.classList.add(blackCoin);
  } else {
    board.classList.add(whiteCoin);
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  captureOpponentCoins(getIndex(cell), currentClass);
}

function swapTurns() {
  whoseTurn = !whoseTurn;
}
function getIndex(clicked) {
  let idx = [].indexOf.call(cells, clicked);
  console.log(idx);
  return idx;
}
function hasNeighbor(cellIndex) {
  const cellRow = Math.floor(cellIndex / 8);
  const cellColumn = cellIndex % 8;

  for (const direction of directions) {
    const neighborRow = cellRow + direction.row;
    const neighborColumn = cellColumn + direction.column;
    const neighborIndex = neighborRow * 8 + neighborColumn;

    // Check if the neighbor is within the board boundaries
    if (
      neighborRow >= 0 &&
      neighborRow < 8 &&
      neighborColumn >= 0 &&
      neighborColumn < 8
    ) {
      const neighborCell = cells[neighborIndex];
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
function findLastNeighborClass(
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
    const neighborCell = cells[neighborIndex];

    // Check if the neighbor cell is occupied by a coin of the opposite color
    if (
      neighborCell.classList.contains(
        currentClass === blackCoin ? whiteCoin : blackCoin
      )
    ) {
      return findLastNeighborClass(
        neighborIndex,
        currentClass,
        directionRow,
        directionColumn
      );
    }
  }

  return currentClass;
}
function captureOpponentCoins(cellIndex, currentClass) {

  let canCapture = false;

  const cellRow = Math.floor(cellIndex / 8);
  const cellColumn = cellIndex % 8;

  for (const direction of directions) {
    let neighborRow = cellRow + direction.row;
    let neighborColumn = cellColumn + direction.column;
    let neighborIndex = neighborRow * 8 + neighborColumn;

    // Check if the neighbor is within the board boundaries
    if (
      neighborRow >= 0 &&
      neighborRow < 8 &&
      neighborColumn >= 0 &&
      neighborColumn < 8
    ) {
      let neighborCell = cells[neighborIndex];

      // Check if the neighbor cell is occupied by the opponent's coin
      if (
        neighborCell.classList.contains(
          currentClass === blackCoin ? whiteCoin : blackCoin
        )
      ) {
        let capturedCoins = [];

        // Continue in the same direction until reaching a cell that is not occupied by the opponent's coin
        while (
          neighborRow >= 0 &&
          neighborRow < 8 &&
          neighborColumn >= 0 &&
          neighborColumn < 8 &&
          neighborCell.classList.contains(
            currentClass === blackCoin ? whiteCoin : blackCoin
          )
        ) {
          capturedCoins.push(neighborCell);
          neighborRow += direction.row;
          neighborColumn += direction.column;
          neighborIndex = neighborRow * 8 + neighborColumn;
          neighborCell = cells[neighborIndex];
        }

        // Check if the last cell in the direction is occupied by the current player's coin
        if (neighborCell?.classList.contains(currentClass)) {
          // Capture the opponent's coins by removing their class and adding the current player's class
          capturedCoins.forEach((capturedCoin) => {
            capturedCoin.classList.remove(
              currentClass === blackCoin ? whiteCoin : blackCoin
            );
            capturedCoin.classList.add(currentClass);
            canCapture = true;
          });
        }
      }
    }
  }
  return canCapture;
}

startGame();
