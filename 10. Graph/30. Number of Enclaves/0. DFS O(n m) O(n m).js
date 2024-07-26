//* Perform a boundary-DFS on border connected 1s
//* Mark the connected land cells as 2 to indicate they can't be an enclave
//* Any remaining 1 cell in the grid is guaranteed to be an enclave
function numberOfEnclaves(grid) {
  function dfs(row, col) {
    if (
      !inBounds(row, col) || //* Out of bounds, can't do anything here
      grid[row][col] !== 1 //* Water Cell
    )
      return;

    //* Mark as border-connected island
    grid[row][col] = 2;

    //* Explore all neigbors
    for (let [r, c] of directions) {
      dfs(row + r, col + c);
    }
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  function isBorder(row, col) {
    return row === 0 || col === 0 || row === ROWS - 1 || col === COLS - 1;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let enclaves = 0;

  //* Look for border connected islands, change them to 2
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1 && isBorder(row, col)) {
        dfs(row, col);
      }
    }
  }

  //* Any remaining 1 is guaranteed to NOT be border connected
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      //* Turn island 1s back into 1s
      if (grid[row][col] === 2) {
        grid[row][col] = 1;
      } else if (grid[row][col] === 1) {
        enclaves++;
      }
    }
  }

  return enclaves;
}

console.log(
  numberOfEnclaves([
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ])
);

console.log(
  numberOfEnclaves([
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ])
);

//* Time: O(n * m) - We iterate over every cell, so the time taken scales with ROWS * COLS
//* At worst, every cell is a land cell, so there are ROWS * COLS cals to DFS

//* Space: O(n * m) - The depth of the call stack is ROWS * COLS at worst if every cell is a land cell
