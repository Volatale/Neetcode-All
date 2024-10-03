//* We need to find the minimum falling
//*     - Start our function from any of the top row's cells
//* From each cell, we can move down-left, down or down-right
//*     - So there are 3 choices at each step
//*     - Take the minimum from each of these choices
//* Use a brute force approach
//*     - There is no heuristic we can apply to know where to start
//*     - So we should try starting at each of the cells on the top row

//* Apply memoization to avoid redundant work
//*     - We have 2D state (row, col)
function minFallingPathSum(matrix) {
  function findPath(row, col) {
    //* Base Case: Out of bounds
    if (col < 0 || col === n) return Infinity;

    //* Base Case: Reached bottom cell
    if (row === n - 1) return matrix[row][col];

    //* Utilize memoized value
    if (dp[row][col] !== Infinity) return dp[row][col];

    return (dp[row][col] =
      Math.min(
        findPath(row + 1, col - 1), //* Down-left
        findPath(row + 1, col), //* Down
        findPath(row + 1, col + 1) //* Down-right
      ) + matrix[row][col]);
  }

  const n = matrix.length;
  let minPathSum = Infinity;

  //* dp[i][j] = Minimum falling path we can get at row i, column j
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));

  //* Try starting from every cell on the top row
  for (let col = 0; col < n; col++) {
    minPathSum = Math.min(minPathSum, findPath(0, col));
  }

  return minPathSum;
}

console.log(
  minFallingPathSum([
    [2, 1, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
); //* 13

console.log(
  minFallingPathSum([
    [-19, 57],
    [-40, -5],
  ])
); //* -59

//* Time: O(n^2) - There are "n" possible values for "row" and "n" possible values for "col"
//* So the rule of product gives us n^2 unique subproblems

//* Space: O(n^2) - There are n^2 unique subproblems, thus the DP array is sized n x n
//* The height of the recursion tree scales with the number of rows
