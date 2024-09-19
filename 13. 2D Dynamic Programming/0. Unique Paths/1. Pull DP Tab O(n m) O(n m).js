//* Counting the number of ways to do something is combinatorics
//*     - Combinatorics = Math, Brute Force, Dynamic Programming etc
//* Rule of Sum applies
//*     - We can EITHER move down OR right (mutual exclusion)
//* (m - 1, n - 1) makes it easier to conceptualize the grid
//*     - Indexing into index "n" or "m" makes no sense as that would be out of bounds
//* This is top down, so technically we are going UP and LEFT
//*     - So we travel to the TOP-LEFT instead of BOTTOM-RIGHT
//* Sum the total number of ways from BOTH paths

//! Recurrence Relation: F(m, n) = F(m - 1, n) + F(m, n - 1)
//* Apply Tabulation to avoid recursion overhead
//*     - We have two parameters, hence 2D State
function uniquePaths(m, n) {
  if (m === 0 && n === 0) return 1;

  //* dp[i][j] = Number of unique ways we can reach bottom right from [row][col]
  const dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

  //* Seed Value: 1 Way to reach [m-1][n-1] (if we start there)
  dp[0][0] = 1;

  //* i represents rows, j represents columns
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      //* Ensure we stay within the bounds
      if (i - 1 >= 0) {
        dp[i][j] += dp[i - 1][j];
      }

      if (j - 1 >= 0) {
        dp[i][j] += dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
}

console.log(uniquePaths(1, 1)); //* 1
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(4, 4)); //* 20

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "m" possible values for rows, and "n" possible values for columns
//* m * n = O(m * n)

//* Space: O(n * m) - There are m * n unique subproblems, so the array's size is m x n
