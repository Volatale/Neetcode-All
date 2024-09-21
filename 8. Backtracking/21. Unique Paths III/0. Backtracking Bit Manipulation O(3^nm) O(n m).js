//* Dynamic Programming won't work here
//*     - We can move in all 4 directions
//*     - Generally, matrix problems can be modeled as graph problems
//!         - But that requires treated the matrix as a DAG
//*         - Being able to move in all 4 directions means the "graph" is cyclic
//*             - Thus, we cannot guarantee each subproblem is solved in the correct order
//* We need to count the number of paths from the start cell to the end cell
//*     - We can ONLY explore each cell once, ignoring the obstacle cells
//* Track the number of empty cells
//*     - If we reach the end cell AND this number is 0, return 1: we found a valid path
//* Use backtracking since DP won't work

//* Instead of a visited matrix, we can use bit manipulation
//!     - n <= 20, m <= 20
//*         - The inputs are relatively small
//!     - m * n <= 20
//*         - So we could represent every possibility using a 32-bit integer
//* The formula (row * COLS + col) converts from a 2D index to a 1D index
//*     - Use this to toggle bits off and on
//* Improvements over using an array of integers:
//*     - This version only uses a SINGLE 32-bit integer, so we can get rid of the array/matrix completely
//*         - The only thing that scales the memory now is the recursion depth (m * n)
//! If m * n > 32, then we'd have to revert to the array-based bit manipulation approach
//*     - There would be no guarantee we could fit every cell in a single 32-bit integer
//*     - Thus, we would need to represent each row individually

//* Set the bit that corresponds to the current cell for every WALKABLE cell
//*     - In our case, we know a cell is visited if the bit position is a 0
//*     - A cell that has NOT been visited yet is a 1
function uniquePathsIII(grid) {
  function findPath(row, col, mask) {
    //* Base Case: Out of Bounds, encountered obstacle, or already visited
    if (
      !inBounds(row, col) ||
      grid[row][col] === -1 ||
      (mask & (1 << (row * COLS + col))) === 0 //* 0 means it was visited
    )
      return 0;

    //* Toggle the bit representing this position
    mask ^= 1 << (row * COLS + col);

    //* Found path to end: ensure we have visited EVERY cell
    if (grid[row][col] === 2) {
      return mask === 0 ? 1 : 0;
    }

    let ways = 0;

    //* Try all 4 neighbors
    for (let [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;
      ways += findPath(newRow, newCol, mask);
    }

    return ways;
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let startCell = [];
  let mask = 0; //* Tracks which cells have been visited

  //* Find starting cell position, and add walkable cells to the mask
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) {
        startCell = [row, col]; //* Found position of start cell
      }

      //* Add cell to the mask
      if (grid[row][col] !== -1) {
        mask |= 1 << (row * COLS + col);
      }
    }
  }

  //* Count paths from the starting cell (this cell counts, so -1)
  return findPath(startCell[0], startCell[1], mask);
}

console.log(
  uniquePathsIII([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, -1],
  ])
); //* 2

console.log(
  uniquePathsIII([
    [1, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2],
  ])
); //* 4

console.log(
  uniquePathsIII([
    [0, 1],
    [2, 0],
  ])
); //* 0

console.log(uniquePathsIII([[1, 0, 0, 2]])); ///* 1

console.log(
  uniquePathsIII([
    [1, 0, 0, 2],
    [0, -1, 0, 0],
  ])
); ///* 0

console.log(
  uniquePathsIII([
    [0, 0],
    [1, 2],
  ])
); //* 1

console.log(uniquePathsIII([[1, 2]])); //* 1

//* Time: O(3^n*m) - We explore each cell 4 times as a result of backtracking
//* The branching factor is 3 even though there are 4 potential calls generated from each call
//*     - We can't go back where we came, so one call is immediately returned
//* The depth of the recursion tree scales with the number of rows * the number of columns
//* In the absolute worst case, every cell is walkable

//* Space: O(n * m) - The depth of the recursion tree scales with the number of rows and columns
//* The visited array scales with the number of rows O(n)
//* Tracking which elements are need to be visited uses constant memory (a single 32-bit integer)
