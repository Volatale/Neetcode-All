//* Perform a simultaneous DFS on both grids at once
//* Iterate through grid2 looking for land cells (1)
//* If we find one, call DFS
//* We need to check each cell attached to this connected component (island)
//*     - If grid1[row][col] === 0 and grid2[row][col] === 2
//!     - This island cannot be considered a sub island
//* Do this same check for every cell
//* Count the number of "true" returns we get back from DFS
function countSubIslands(grid1, grid2) {
  function dfs(row, col) {
    //* None of these mean this isn't a sub island
    if (
      !inBounds(row, col, ROWS, COLS) || //* Out of Bounds
      grid2[row][col] === 0 ||
      visited.has(`${row}-${col}`)
    )
      return true;

    //* Mark as visited
    visited.add(`${row}-${col}`);

    let isSubIsland = true;

    //* grid2[row][col] === 2, if grid1 ISN'T, this can't be a sub island
    if (grid1[row][col] === 0) {
      isSubIsland = false;
    }

    //* Check if the neighbors are sub islands (every neighbor must be)
    for (let [r, c] of directions) {
      if (!dfs(row + r, col + c)) {
        isSubIsland = false;
      }
    }

    return isSubIsland;
  }

  const ROWS = grid1.length;
  const COLS = grid1[0].length;

  const visited = new Set();

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let subIslands = 0;

  //* Simultaneous DFS on both grids (but look for islands in grid2 specifically)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid2[row][col] === 1 && !visited.has(`${row}-${col}`)) {
        if (dfs(row, col)) {
          subIslands++;
        }
      }
    }
  }

  return subIslands;
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  countSubIslands(
    [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 1],
    ],
    [
      [0, 1, 1],
      [0, 0, 0],
      [0, 0, 1],
    ]
  )
);

console.log(
  countSubIslands(
    [
      [1, 1, 1, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 1, 1],
    ],
    [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1],
      [0, 1, 0, 0, 0],
      [1, 0, 1, 1, 0],
      [0, 1, 0, 1, 0],
    ]
  )
); //* 3

console.log(
  countSubIslands(
    [
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
    ],
    [
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [1, 0, 0, 0, 1],
    ]
  )
); //* 2

//* Time: O(n * m) - We iterate through the entire array (n * m)
//* At worst we call DFS n * m times since we process each cell once at most

//* Space: O(n * m) - The depth of the call stack is n * m in the worst case
//* The visited set can potentially store every position
