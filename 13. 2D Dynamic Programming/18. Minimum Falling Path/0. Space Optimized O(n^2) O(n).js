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
//* It is possible to eliminate the "row" state completely
//*     - Use a singular 1D array to handle the entire state space
//*         - This array holds the PREVIOUS row
//*     - Then, use another DP array to hold the results of the CURRENT row
function minFallingPathSum(matrix) {
  if (matrix.length === 0) return 0;

  const n = matrix.length;

  //* dp[i][j] = Minimum falling path we can get at row i, column j
  let dp = new Array(n).fill(Infinity);

  //* Base Case: Top row is initialized to matrix[0]
  for (let col = 0; col < n; col++) {
    dp[col] = matrix[0][col];
  }

  //* Calculate the minimum path sum for call possible cells
  for (let row = 1; row < n; row++) {
    const newRow = new Array(n).fill(Infinity);

    for (let col = 0; col < n; col++) {
      const topLeft = col === 0 ? Infinity : dp[col - 1];
      const top = dp[col];
      const topRight = col === n - 1 ? Infinity : dp[col + 1];

      newRow[col] = Math.min(topLeft, top, topRight) + matrix[row][col];
    }

    dp = newRow;
  }

  //* Find the minimum path sum on the final row
  let minPathSum = Infinity;

  for (let col = 0; col < n; col++) {
    minPathSum = Math.min(minPathSum, dp[col]);
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

//* Space: O(n) - We are using two 1D arrays to hold the state of the previous and current rows respectively
//* O(2 * n) = O(n)
