function surroundedRegions(board) {
  function dfs(row, col, marking) {
    if (!inBounds(row, col) || board[row][col] !== "O") return;

    //* Mark as connected to edge O
    board[row][col] = "T";

    //* Modify neighbors
    for (let [r, c] of directions) {
      dfs(row + r, col + c, marking);
    }
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  function isBorderCell(row, col) {
    return row === 0 || col === 0 || row === ROWS - 1 || col === COLS - 1;
  }

  const ROWS = board.length;
  const COLS = board[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  //* Find all of the border "O"; turn them into "T"
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === "O" && isBorderCell(row, col)) {
        dfs(row, col);
      }
    }
  }

  //* Turn the remaining Os into X
  //* Turn the remaining T back into O
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === "T") {
        board[row][col] = "O";
      } else if (board[row][col] === "O") {
        board[row][col] = "X";
      }
    }
  }

  return board;
}

console.log(
  surroundedRegions([
    ["X", "X", "X", "X", "X"],
    ["O", "O", "O", "X", "X"],
    ["X", "X", "X", "O", "X"],
    ["X", "X", "X", "X", "X"],
  ])
);

console.log(surroundedRegions([["X", "X", "X"]]));

console.log(
  surroundedRegions([
    ["X", "X", "X"],
    ["X", "O", "X"],
    ["X", "X", "X"],
  ])
);

console.log(
  surroundedRegions([
    ["X", "X", "X", "X"],
    ["X", "O", "O", "X"],
    ["X", "X", "O", "X"],
    ["X", "O", "X", "X"],
  ])
);

console.log(surroundedRegions([["X"]]));

//* Time: O(n * m) - We iterate through the entire matrix twice (n * m)
//* In the worst case, every cell is a "O", so we call DFS once for each cell

//* Space: O(n * m) - The depth of the recursion scales with the size of the input
//* In the worst case, every cell is a "O", so we call DFS once for every cell
