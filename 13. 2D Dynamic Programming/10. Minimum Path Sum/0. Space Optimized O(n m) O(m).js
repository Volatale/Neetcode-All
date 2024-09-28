//* Matrix problems can be visualized as GRAPH problems
//*     - In our case, we have a DAG (directed acyclic graph)
//*         - We can only move DOWN and RIGHT at each step
//*         - So we know each cell has TWO prerequisite subproblems (like a topological sort)
//*             - Both of these subproblems will be computed by the time we need their values
//* Greedy would work if we used a Min Heap

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (track the row and column)
//* In this version, we eliminated the extra two for loops
//* We're also only using a 1D array (we eliminated the row state)
//*     - dp[i][j] = min(dp[i-1][j], dp[i][j-1]): WITH the "i" state
//*         - dp[][j] = min(dp[][j], dp[][j-1]): Removed the "i" state
//*         - dp[j] = min(dp[j], dp[j-1]): WITHOUT the "i" state
//*     - dp[j] = dp[i-1][j]
//*     - dp[j-1] = dp[i][j-1]
function minPathSum(grid) {
  const n = grid.length;
  const m = grid[0].length;

  //* dp[i][j] = Minimum path sum we can achieve at row i and column j
  //* We only need to keep ONE row in memory since we are accumulating
  const dp = new Array(m).fill(0);

  //* Sum at top-left cell is grid[0][0]
  dp[0] = grid[0][0];

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (row === 0 && col > 0) {
        //* We can only take the LEFT value
        dp[col] = dp[col - 1] + grid[row][col];
      } else if (row > 0 && col === 0) {
        //* We can only take the ABOVE value
        dp[col] = dp[col] + grid[row][col];
      } else if (row > 0 && col > 0) {
        //* Either take the value from above or to the left
        dp[col] = Math.min(dp[col], dp[col - 1]) + grid[row][col];
      }
    }
  }

  //* Minimum sum to get to this cell
  return dp[m - 1];
}

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
); //* 7

console.log(minPathSum([[1, 2, 3]])); //* 6

console.log(
  minPathSum([
    [1, 3],
    [4, 4],
  ])
); //* 8

console.log(minPathSum([[10]])); //* 10

console.log(
  minPathSum([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
); //* 0

//* Time: O(n * m) - We are caching the results of each subproblem
//* There are "n" possible values for row and "m" possible values for col
//* Using the rule of product, we get n * m unique states

//* Space: O(m) - We are only keeping a single row in memory at once
//* The "i" (row" state has been removed entirely)
