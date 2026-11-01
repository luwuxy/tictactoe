const gameBox = document.querySelector('.game-box');
const button = document.querySelector('button');
const h1 = document.querySelector('h1');

button.addEventListener("click", () => {
  if (button.textContent === "Restart") {
    gameboard.resetBoard();
    resetCells();
    h1.textContent = "";
  }

  button.textContent = "Restart";
  game();
});

const gameboard = (() => {
  const board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];

  const getBoard = () => board;

  const setBoard = (index, symbolPlaced) => {
    board[index] = symbolPlaced;
  }

  const resetBoard = () => board.fill("");

  return { getBoard, setBoard, resetBoard }
})()

const winningConditions = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
]

const player = (name, side) => {
  const moves = [];

  const getMoves = () => moves;

  const setMoves = (move) => {
    moves.push(move);
  }

  return { name, side, getMoves, setMoves };
}

const game = () => {
  const player1 = player("Player 1", "X");
  const player2 = player("Player 2", "O");

  let isPlayerOne = true;
  let isGameOver = false;
  let winner;

  for (const [index, item] of [...gameBox.children].entries()) {
    let itemClicked = false;

    item.addEventListener('click', () => {
      if (itemClicked) return;
      if (isGameOver) return;

      const symbolPlaced = isPlayerOne ? "X" : "O";

      isPlayerOne ? player1.setMoves(index) : player2.setMoves(index);

      for (const condition of winningConditions) {
        const winStatus = condition.every((item, index) => {
          return isPlayerOne ? player1.getMoves().includes(item) : player2.getMoves().includes(item);
        })

        if (winStatus) {
          isGameOver = true;
          winner = isPlayerOne ? player1 : player2;

          h1.textContent = `The winner is ${winner.name}!`;
        }
      }

      item.textContent = symbolPlaced;
      gameboard.setBoard(index, symbolPlaced);
      // console.log(gameboard.getBoard());

      const isBoardFilled = !gameboard.getBoard().some((item) => {
        return item === "";
      })

      if (isBoardFilled && !winner) {
        isGameOver = true;
        h1.textContent = "The game is tied!";
      }

      itemClicked = true;
      isPlayerOne = !isPlayerOne;
    })
  }
}

const resetCells = () => {
  for (const item of gameBox.children) {
    const newItem = item.cloneNode(true);
    newItem.textContent = "";
    item.replaceWith(newItem);
  }
}