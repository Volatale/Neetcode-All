//* We need to find the minimum falling
//*     - Start our function from any of the top row's cells
//* From each cell, we can move down-left, down or down-right
//*     - So there are 3 choices at each step
//*     - Take the minimum from each of these choices
//* Use a brute force approach
//*     - There is no heuristic we can apply to know where to start
//*     - So we should try starting at each of the cells on the top row

//* Apply tabulation to avoid recursion overhead
//*     - We have 2D state (row, col)
function minFallingPathSum(matrix) {
  if (matrix.length === 0) return 0;

  const n = matrix.length;

  //* dp[i][j] = Minimum falling path we can get at row i, column j
  const dp = new Array(n).fill(0).map(() => new Array(n).fill(Infinity));

  //* Base Case: Top row is initialized to matrix[0]
  for (let col = 0; col < n; col++) {
    dp[0][col] = matrix[0][col];
  }

  //* Calculate the minimum path sum for call possible cells
  for (let row = 1; row < n; row++) {
    for (let col = 0; col < n; col++) {
      const topLeft = col === 0 ? Infinity : dp[row - 1][col - 1];
      const top = dp[row - 1][col];
      const topRight = col === n - 1 ? Infinity : dp[row - 1][col + 1];

      dp[row][col] = Math.min(topLeft, top, topRight) + matrix[row][col];
    }
  }

  //* Find the minimum path sum on the final row
  let minPathSum = Infinity;

  for (let col = 0; col < n; col++) {
    minPathSum = Math.min(minPathSum, dp[n - 1][col]);
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

//* Time: O(n^2) - We are performing a nested for loop to calculate the results of every subproblem
//* There are "n" possible values for row and "n" possible values for columns
//* Rule of product: n * n = n^2 unique subproblems

//* Space: O(n^2) - There are n^2 unique subproblems, thus the DP array is sized n x n
