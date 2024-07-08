//* All of the land cells are connected
//* Iterate through every cell and find the first land cell
//* Call DFS on that node and return whatever the returned value is
//* Out of Bounds is the same as finding a water cell
//* So we should return 1 (to mark an edge for the perimeter)
//* Travel in all 4 cardinal directions, summing the permeter from each call
//* Mark the cells we have visited by changing their value to 2
//*     - Visited cells return 0 because we can't reuse the same cell
function islandPerimeter(grid) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  //* The entire island is connected, so find any land
  //* And return whatever the perimeter is
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 1) return dfs(row, col, ROWS, COLS, grid);
    }
  }
}

function dfs(row, col, ROWS, COLS, grid) {
  //* Marks water of some sort (whether out of bounds or an actual 0)
  if (row < 0 || col < 0 || row >= ROWS || col >= COLS || grid[row][col] === 0)
    return 1;

  //* Cell has already been visited in this path
  if (grid[row][col] === 2) return 0;

  const num = grid[row][col];
  grid[row][col] = 2; //* Marks as visited

  let perimeter =
    dfs(row - 1, col, ROWS, COLS, grid) + //* Up
    dfs(row, col + 1, ROWS, COLS, grid) + //* Right
    dfs(row + 1, col, ROWS, COLS, grid) + //* Down
    dfs(row, col - 1, ROWS, COLS, grid); //* Left

  grid[row][col] = num; //* Mark as unvisited (backtrack)

  return perimeter;
}

console.log(
  islandPerimeter([
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0],
  ])
); //* 16

console.log(islandPerimeter([[1]])); //* 4

console.log(islandPerimeter([[1, 0]])); //* 4

console.log(
  islandPerimeter([
    [1, 1],
    [1, 1],
  ])
); //* 8

//* Time: O(n * m) - The time takens scales with the number of rows and columns
//* We iterate over each in the worst case (where the land cell is at the bottom right)
//* Each call to DFS in the worst case creates 4 more calls, so the branching factor is 4
//* However, we only visit each cell ONCE since we mark them as visited

//* Space: O(n * m) - In the worst case, every cell is a "1"
//* Which means the depth of the call stack is scales with O(n * m)
