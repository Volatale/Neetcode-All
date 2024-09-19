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
//*     - The recurrence relation tells us we only rely on the PREVIOUS and CURRENT rows
//*     - So only keep those two rows in memory: use bitwise alternation
//* Apply Tabulation to avoid recursion overhead
//*     - We have two parameters, hence 2D State
function uniquePaths(m, n) {
  if (m === 0 && n === 0) return 1;

  //* dp[i][j] = Number of unique ways we can reach bottom right from [row][col]
  //* We only need the previous row and the current row
  const dp = new Array(2).fill(0).map(() => new Array(n).fill(1));

  //* Seed Value: 1 Way to reach [m-1][n-1] (if we start there)
  dp[0][0] = 1;

  //* i represents rows, j represents columns
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      //* Ensure we stay within the bounds
      dp[i & 1][j] = dp[(i - 1) & 1][j] + dp[i & 1][j - 1];
    }
  }

  return dp[(m - 1) & 1][n - 1];
}

console.log(uniquePaths(1, 1)); //* 1
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(4, 4)); //* 20

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "m" possible values for rows, and "n" possible values for columns

//* Space: O(n) - We are only keeping the current and previous row in memory now
//* So we will always have exactly 2 rows, thus the space usage scales solely based on "n"
