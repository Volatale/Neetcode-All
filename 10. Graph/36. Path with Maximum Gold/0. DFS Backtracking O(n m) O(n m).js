//* Try taking all of the gold starting from EVERY cell > 0
//* We need to backtrack after taking the gold
//*     - There is no way to tell prior if this is a better path
//!     - So we should explore every path
//* Take the MAXIMUM among every path
//* Start at the current cell
//* Take all of the gold
//*     - currentGold = grid[row][col]
//*     - grid[row][col] = 0
//*     - This effectively marks it as visited
//* Accumulate all of the gold from all directions for this cell
//* Put the gold back where we found it
//*     - grid[row][col] = currentGold
function getMaximumGold(grid) {
  function dfs(row, col) {
    if (
      !inBounds(row, col) || //* Out of bounds; no gold here
      grid[row][col] === 0 //* Can't visit 0 cells
    )
      return 0;

    //* Mark as visited (take the gold)
    let currentGold = grid[row][col];
    grid[row][col] = 0;

    let goldFromPath = 0;

    //* Explore every path from the current cell
    for (let [r, c] of direction) {
      goldFromPath = Math.max(goldFromPath, dfs(row + r, col + c));
    }

    //* Mark as unvisited (put the gold back)
    grid[row][col] = currentGold;
    return currentGold + goldFromPath;
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const direction = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let maxGold = 0;

  //* Try every path (start from every cell)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] > 0) {
        maxGold = Math.max(maxGold, dfs(row, col));
      }
    }
  }

  return maxGold;
}

console.log(
  getMaximumGold([
    [0, 6, 0],
    [5, 8, 7],
    [0, 9, 0],
  ])
); //* 24

console.log(getMaximumGold([[4, 6, 7, 2]])); //* 19

//* Time: O(n * m * 4^25) - We iterate through the entire grid (n * m)
//* There are at most 25 cells with gold in them
//* At each level of recursion, there are 4 additional calls
//* So the branching factor is 4^25 at most

//* Space: O(n * m) - There are 25 cells that have gold at most
//* So there are 25 * 25 DFS, but this number must scale with rows and column
