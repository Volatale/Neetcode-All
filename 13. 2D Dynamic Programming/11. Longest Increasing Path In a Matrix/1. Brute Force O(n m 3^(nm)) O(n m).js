//* Perform a DFS at EVERY cell
//*     - We have no idea what the "best" cell to start from is
//*     - Which means there is no visible heuristic we can apply
//*         - Brute forcing every cell is the best we can do
//! We need to know the value of the PREVIOUS cell
//*     - This way, we can tell if the current cell is even valid
//*     - Use an integer, otherwise we need to track two more parameters
//* We can move in all 4 directions from every cell
//*     - The CURRENT cell counts as a cell in our path (so we add 1)
//*     - Take the MAXIMUM of all calls at every level
//* Going out of bounds of the array, or finding a NON-strictly increasing cell is a base case
//*     - Return 0 to indicate this path does not count (it doesn't contribute at all)
//!     - Cells that are EQUAL do not contribute to our path length
//* Tracking visited cells won't help here
//*     - We need to redo the work for EVERY cell, so it won't help future calls
function longestIncreasingPath(matrix) {
  function dfs(row, col, prev) {
    //* Base Case: Out of Bounds, or cell is NOT increasing
    if (!isValid(row, col) || matrix[row][col] <= prev) return 0;

    let pathLength = 0;

    //* Travel in all 4 directions
    for (const [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      pathLength = Math.max(
        pathLength,
        dfs(newRow, newCol, matrix[row][col]) + 1 //* Include THIS cell
      );
    }

    return pathLength;
  }

  function isValid(row, col) {
    return row >= 0 && col >= 0 && row < n && col < m;
  }

  if (matrix.length === 0) return 0;

  const n = matrix.length;
  const m = matrix[0].length;

  let maxLength = 0;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  //* Try a path from EVERY cell
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      maxLength = Math.max(maxLength, dfs(row, col, -1));
    }
  }

  return maxLength;
}

console.log(
  longestIncreasingPath([
    [9, 9, 4],
    [6, 6, 8],
    [2, 1, 1],
  ])
); //* 4

console.log(longestIncreasingPath([[1, 2, 3]])); //* 3
console.log(longestIncreasingPath([[1]])); //* 1
console.log(longestIncreasingPath([[0, 0, 0]])); //* 1
console.log(
  longestIncreasingPath([
    [1, 2, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
); //* 9

//* Time: O(n * m * 3^(n*m)) - There are n * m outer calls to DFS in total
//* Each DFS leads to 3 (technically 4) calls, so the branching factor is 3
//* The height of the recursion tree is n * m since that represents EVERY cell
//* Each subsequent DFS call after the first leads to 4 calls, but 1 implicitly backtracks
//* So that call immediately returns

//* Space: O(n * m) - The height of the recursion tree scales with n * m
