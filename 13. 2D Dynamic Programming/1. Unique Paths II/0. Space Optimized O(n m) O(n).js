//* Counting the number of ways to do something is combinatorics
//*     - Combinatorics = Math, Brute Force, Dynamic Programming etc
//* Rule of Sum applies
//*     - We can EITHER move down OR right (mutual exclusion)
//* (ROWS - 1, COLS - 1) makes it easier to conceptualize the grid
//*     - Indexing into index "n" or "m" makes no sense as that would be out of bounds
//* This is top down, so technically we are going UP and LEFT
//*     - So we travel to the TOP-LEFT instead of BOTTOM-RIGHT
//* Sum the total number of ways from BOTH paths
//*     - Optimal substructure exists
//*     - Overlapping subproblems exist

//* If we encounter a cell that is a 1 (obstacle), return 0
//*     - This is an invalid path, thus it cannot be counted

//! Recurrence Relation: F(m, n) = F(m - 1, n) + F(m, n - 1)
//* Apply tablation to avoid recursion overhead
//*     - We have two non-constant parameters
//*         - The current row, and the current column
//*     - The dimensionality is 2D
//! Why not just eliminate the the 2D state completely?
//*     - dp[i][j] = dp[i-1][j] + dp[i][j-1] (in 2D, but we want 1D)
//*         - dp[][j] = dp[][j] + dp[][j-1] (removing all i's)
//*         - dp[j] = dp[j] + dp[j-1]
//*     - If you find an obstacle, dp[j] = 0
//*         - We can't count paths involving this cell
function uniquePathsWithObstacles(obstacleGrid) {
  const ROWS = obstacleGrid.length;
  const COLS = obstacleGrid[0].length;

  //* Impossible to find a path, either the start or end is blocked
  if (obstacleGrid[0][0] === 1 || obstacleGrid[ROWS - 1][COLS - 1]) {
    return 0;
  }

  //* dp[i] = Number of unique paths to this cell
  const dp = new Array(COLS).fill(0);

  //* Base Case: Always have a way to reach bottom right in size (0, 0) grid
  dp[0] = 1;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      //* Found an obstacle; all paths including this are not valid
      if (obstacleGrid[row][col] === 1) {
        dp[col] = 0;
      } else if (col > 0) {
        dp[col] += dp[col - 1];
      }
    }
  }

  return dp[COLS - 1];
}

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
); //* 2

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);

console.log(uniquePathsWithObstacles([[0, 0, 0]])); //* 1

console.log(
  uniquePathsWithObstacles([
    [0, 0, 1],
    [0, 1, 0],
  ])
); //* 0

console.log(uniquePathsWithObstacles([[0, 0, 1]])); //* 0

console.log(
  uniquePathsWithObstacles([
    [0, 1],
    [0, 0],
  ])
); //* 1

console.log(
  uniquePathsWithObstacles([
    [0, 0],
    [0, 1],
    [0, 0],
  ])
); //* 1

//* Time: O(n * m) - There are m + 1 possible values for "row" and n + 1 possible values for "col"
//* Total number of unique states = (m + 1) * (n + 1) = mn + 2

//* Space: O(m) - We removed the need to keep the rows in memory
//* So the space now solely relies on the number of columns (m)
