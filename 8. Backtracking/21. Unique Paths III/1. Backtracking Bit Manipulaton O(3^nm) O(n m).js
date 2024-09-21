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
//*     - The number of rows and columns <= 20
//*         - Which means a 32-bit integer can represent all the possibilities we need
//*     - We use a different integer to represent each row
//*         - [0] represents row 0
//*         - [1] represents row 1, etc.
//!     - Similar to a visited matrix
//*         - 0 represents not visited
//*         - 1 represents visited
//*     - visited[row] gives us the number we need
//*         - We can check the bit representing the column using visited[row] & (1 << col)
//*         - TOGGLE the respective bit using visited[row] ^= 1 << col
function uniquePathsIII(grid) {
  function findPath(row, col, remaining) {
    //* Base Case: Out of Bounds, encountered obstacle, or already visited
    if (
      !inBounds(row, col) ||
      grid[row][col] === -1 ||
      visited[row] & (1 << col) //* Check if the k-th bit is set (for the current row)
    )
      return 0;

    //* Found path to end: ensure we have visited EVERY cell
    if (grid[row][col] === 2) {
      return remaining === 0 ? 1 : 0;
    }

    let ways = 0;

    //* Toggle the bit representing this position
    visited[row] ^= 1 << col;

    //* Try all 4 neighbors
    for (let [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;
      ways += findPath(newRow, newCol, remaining - 1);
    }

    //* Backtrack
    //* Toggle the bit representing this position
    visited[row] ^= 1 << col;
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
  let walkableCells = 0;

  //* Each integer corresponds to a bitmask tracking the ith row
  const visited = new Array(COLS).fill(0);

  //* Find starting cell position, and count walkable cells
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) {
        startCell = [row, col]; //* Found position of start cell
      }

      //* Count number of walkable cells (0, 1, 2)
      if (grid[row][col] !== -1) {
        walkableCells++;
      }
    }
  }

  //* Count paths from the starting cell (this cell counts, so -1)
  return findPath(startCell[0], startCell[1], walkableCells - 1);
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

//* Time: O(3^n*m) - We explore each cell 4 times as a result of backtracking
//* The branching factor is 3 even though there are 4 potential calls generated from each call
//*     - We can't go back where we came, so one call is immediately returned
//* The depth of the recursion tree scales with the number of rows * the number of columns
//* In the absolute worst case, every cell is walkable

//* Space: O(n * m) - The depth of the recursion tree scales with the number of rows and columns
//* The visited array scales with the number of rows O(n)
