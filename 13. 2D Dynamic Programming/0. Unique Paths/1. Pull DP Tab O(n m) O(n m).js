//* We are given the size of the grid, but not the grid itself
//* Since we are doing top-down DP
//*     - Start at the bottom-right cell
//*     - End at top-left

//! Recurrence Relation: F(i,j) = F(i-1,j) + F(i,j-1)
//* Apply tabulation (using Pull DP)
function uniquePaths(m, n) {
  //* dp[i][j] = Number of Unique Ways to get to cell (i, j)
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

  //* There is only 1 distinct way to get to top-left; do nothing
  dp[0][0] = 1;

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      //* Like in the recursive version, only count paths in bounds
      if (i - 1 >= 0) {
        dp[i][j] += dp[i - 1][j];
      }

      if (j - 1 >= 0) {
        dp[i][j] += dp[i][j - 1];
      }
    }
  }

  //* Return final subproblem
  return dp[m - 1][n - 1];
}

console.log(uniquePaths(3, 3)); //* 6
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(2, 2)); //* 2
console.log(uniquePaths(4, 4)); //* 20

//* Time: O(m * n) - We memoize computations, so there are only n * m distinct subproblems

//* Space: O(n * m) - We cache each of the n * m subproblems, so there are n * m unique keys
