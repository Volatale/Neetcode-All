//* We can model it as a graph problem
//* Each cell is is a vertex
//* There is an invisible edge that links adjacent vertices
//* Each 0 cell is water, and so is out of bounds
//*     - Thus we return 0 on out of bounds or water cell
//* Each 1 cell is land
//*     - We want to accumulate the number of 1 cells
//*     - So we can assume the islands to be connected components
//*         - So we are basically counting the size of component
//* Mark the cells we have already visited otherwise we are counting the same cell twice
//* Iterate through the entire matrix looking for land cells
//*     - We have no guarantee that the first we find is the largest
//*     - So check every cell
function maxAreaOfIsland(grid) {
  function dfs(row, col) {
    if (
      !inBounds(row, col, ROWS, COLS) ||
      grid[row][col] === 0 || //* Water Cell
      visited[row][col] //* Already visited
    )
      return 0;

    //* Mark as visited
    visited[row][col] = true;

    let area = 1; //* Includes THIS land cell

    //* DFS in all 4 directions
    area += dfs(row - 1, col); //* Up
    area += dfs(row, col + 1); //* Right
    area += dfs(row + 1, col); //* Down
    area += dfs(row, col - 1); //* Left

    //* The total area from all of the land cells
    return area;
  }

  const ROWS = grid.length;
  const COLS = grid[0].length;

  //* Visited Matrix
  const visited = new Array(ROWS)
    .fill(false)
    .map(() => new Array(COLS).fill(false));

  let maxArea = 0;

  //* Iterate through the matrix searching for land cells (connected components)
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      //* Only DFS on land cells (which are connected components)
      if (grid[row][col] === 1 && !visited[row][col]) {
        maxArea = Math.max(maxArea, dfs(row, col));
      }
    }
  }

  return maxArea;
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  maxAreaOfIsland([
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
  ])
); //* 6

console.log(maxAreaOfIsland([[1, 1, 1]])); //* 3

console.log(maxAreaOfIsland([[1, 0, 1]])); //* 1
console.log(
  maxAreaOfIsland([
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ])
); //* 10

//* Time: O(n * m) - Iterating through the entire matrix takes O(n * m) time
//* Each call to DFS has a branching factor of 4, but we only process each node ONCE
//* So there will only be n * m calls to DFS in total assuming every cell is a 1 (in the worst case)

//* Space: O(n * m) - We need to track which cells have already been visited
//* So we have a visited matrix that does just that; it scales proportionally with the input size (n * m)
