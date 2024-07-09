//* We want to find the number of connected components (islands)
//* Out of bounds is the same as a water cel (return)
//* Mark cells as visited so we don't consider the same cell twice
//* We are essentially counting how many times DFS is called from the top level
//* At the end of the calls, iterate through once more and set all of the "2"s back to "1"s
//* Track the number of total islands and increment every call made from the top level
function numberOfIslands(grid) {
  const ROWS = grid.length;
  const COLS = grid[0].length;

  let islands = 0;

  //* Search for land and DFS when we find it
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === "1") {
        dfs(row, col, ROWS, COLS, grid);
        islands++;
      }
    }
  }

  //* Change all of the # cells (visited) back to 1s
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === "#") {
        grid[row][col] = "1";
      }
    }
  }

  return islands;
}

function dfs(row, col, ROWS, COLS, grid) {
  if (
    !inBounds(row, col, ROWS, COLS) ||
    grid[row][col] === "0" || //* Water
    grid[row][col] === "#" //* Already visited
  )
    return;

  //* Mark as visited
  grid[row][col] = "#";

  //* Up, Right, Down, Left respectively
  dfs(row - 1, col, ROWS, COLS, grid);
  dfs(row, col + 1, ROWS, COLS, grid);
  dfs(row + 1, col, ROWS, COLS, grid);
  dfs(row, col - 1, ROWS, COLS, grid);
}

function inBounds(row, col, ROWS, COLS) {
  return row >= 0 && col >= 0 && row < ROWS && col < COLS;
}

console.log(
  numberOfIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ])
); //* 1

console.log(
  numberOfIslands([
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ])
); //* 3

console.log(numberOfIslands([["1"]])); //* 1
console.log(numberOfIslands([["1", "0", "1"]])); //* 2

//* Time: O(n * m) - We iterate through the entire input (n x m matrix)
//* The DFS call itself has a branching factor of 4, but we mark cells as visited
//* So in the worst case, every cell is a "1", which means n * m calls to DFS

//* Space: O(n * m) - In the worst case, every cell is a "1", so n * m calls to DFS
//* Therefore the depth of the recursion is proportional to n * m too
