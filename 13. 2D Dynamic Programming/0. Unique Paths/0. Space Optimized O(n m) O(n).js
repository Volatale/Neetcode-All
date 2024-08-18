//* We are given the size of the grid, but not the grid itself
//* Since we are doing top-down DP
//*     - Start at the bottom-right cell
//*     - End at top-left

//* Apply tabulation (using Pull DP)
//! Recurrence Relation: F(i,j) = F(i-1,j) + F(i,j-1)
//* According to the recurrence relation, we only need the two previous rows
//*     - Create a 2 x n matrix
//*     - Use the bitwise alternation method to alternate between rows
//*         - Whenever we need to access a ROW, use i & 1
//*             - 0 & 1 = 0
//*             - 1 & 1 = 1
//*             - 2 & 1 = 0
//*             - 3 & 1 = 1
//*!    - Odd rows correspond to the first row, evens correspond to the second
function uniquePaths(m, n) {
  //* dp[i][j] = Number of Unique Ways to get to cell (i, j)
  //* Use bitwise alternation to swap between rows
  const dp = new Array(2).fill(0).map(() => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      //* Get the top and left values
      dp[i & 1][j] = dp[(i - 1) & 1][j] + dp[i & 1][j - 1];
    }
  }

  //* Return final subproblem
  return dp[(m - 1) & 1][n - 1];
}

console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(2, 2)); //* 2
console.log(uniquePaths(4, 4)); //* 20
console.log(uniquePaths(3, 3)); //* 6

//* Time: O(m * n) - We memoize computations, so there are only n * m distinct subproblems

//* Space: O(n) - We always create an array with 2 rows, but the number of columns can change
//* So the space usage scales with "n"
