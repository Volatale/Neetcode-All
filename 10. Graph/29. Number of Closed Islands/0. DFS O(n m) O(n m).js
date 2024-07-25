//* Use DFS or BFS to traverse to neighbors
//* Going out of bounds means that the island cell we came from is NOT surrounded
//* Check every island cell
//*     - If ANY DFS returns false, it is not a closed island
function numberOfClosedIslands(grid) {
  function dfs(row, col) {
    if (!inBounds(row, col)) return false; //* Out of bounds means that cell ISN'T SURROUNDED
    if (
      grid[row][col] === 1 || //* Found a water cell, this means ONE of the sides is surrounded
      visited.has(`${row}-${col}`) //* Visiting a visited cell doesn't invalidate any
    )
      return true;

    visited.add(`${row}-${col}`);

    //* Optimistically assume this is valid
    let isValid = true;

    //* Explore all neighbors, if any DFS returns false, this cell is false too
    for (let [r, c] of directions) {
      if (!dfs(row + r, col + c)) {
        isValid = false;
      }
    }

    return isValid;
  }

  function inBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const visited = new Set();

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  let closedIslands = 0;

  //* Explore the grid looking for islands
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0 && !visited.has(`${row}-${col}`)) {
        if (dfs(row, col)) {
          closedIslands++;
        }
      }
    }
  }

  return closedIslands;
}

console.log(
  numberOfClosedIslands([
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ])
); //* 1

console.log(
  numberOfClosedIslands([
    [0, 0, 1, 1],
    [1, 1, 0, 1],
    [0, 0, 1, 1],
  ])
); //* 1

console.log(
  numberOfClosedIslands([
    [1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 1, 0],
    [1, 0, 1, 0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0],
  ])
); //* 2

console.log(
  numberOfClosedIslands([
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
  ])
); //* 1

console.log(
  numberOfClosedIslands([
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ])
); //* 2

//* Time: O(n * m) - We iterate through the array looking for islands
//* This scales with the number of rows and columns
//* In the worst case, the depth of the call stack scales also scales with rows * cols

//* Space: O(n * m) - The visited set can potentially store every cell if they are all land cells
