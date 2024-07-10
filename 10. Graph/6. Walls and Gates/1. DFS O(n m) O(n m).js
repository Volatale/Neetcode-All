//* Iterate through the array looking for walls
//* From each wall, call DFS and track the depth
//* If we go out of bounds, find a value < distance or a -1, return
//*     - If grid[row][col] < distance, we already found a closer wall for this empty room
//*     - Going out of bounds means we can't update the value anyway
//* Iterate in all 4 directions looking for other empty walls
function wallsAndGates(grid) {
  function dfs(row, col, distance) {
    if (
      !inBounds(row, col, ROWS, COLS) ||
      grid[row][col] === -1 || //* Wall
      grid[row][col] < distance //* Already has a shorter distance
    )
      return;

    //* Replace the value
    grid[row][col] = distance;

    //* DFS in all 4 directions, Up, Right, Down, Left
    for (let [r, c] of directions) {
      dfs(row + r, col + c, distance + 1);
    }
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  if (ROWS === 0 && COLS === 0) return grid;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  //* DFS looking for wall cells (0)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0 && !visited[row][col]) {
        dfs(row, col, 0);
      }
    }
  }

  return grid;
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  wallsAndGates([
    [Infinity, -1, 0, Infinity],
    [Infinity, Infinity, Infinity, -1],
    [Infinity, -1, Infinity, -1],
    [0, -1, Infinity, Infinity],
  ])
);

console.log(wallsAndGates([[0, Infinity, Infinity, Infinity]]));
console.log(wallsAndGates([[Infinity, 0, 0, Infinity]]));

console.log(
  wallsAndGates([
    [-1, -1, -1],
    [-1, -1, 0],
    [0, 0, Infinity],
  ])
);

//* Time: O(n * m) - Iterating through the array looking for walls takes O(n * m)
//*     - We don't know where the walls are
//* The branching factor of the DFS is technically 4 since each call turns into 4 extra calls
//* But we are essentially marking the cells as visited, so in the worst case there are n * m DFS calls

//* Space: O(n * m) - The depth of the recursion scales with n * m
//* There are n * m recursive calls at worst if everything is a 0
