//* Matrix problems can be visualized as GRAPH problems
//*     - In our case, we have a DAG (directed acyclic graph)
//*         - We can only move DOWN and RIGHT at each step
//*         - So we know each cell has TWO prerequisite subproblems (like a topological sort)
//*             - Both of these subproblems will be computed by the time we need their values
//* Greedy would work if we used a Min Heap

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (track the row and column)
function minPathSum(grid) {
  const n = grid.length;
  const m = grid[0].length;

  //* dp[i][j] = Minimum path sum we can achieve at row i and column j
  const dp = new Array(n).fill(0).map(() => new Array(m).fill(0));

  //* Sum at top-left cell is grid[0][0]
  dp[0][0] = grid[0][0];

  //* Handle case where we only move down
  for (let row = 1; row < n; row++) {
    dp[row][0] = dp[row - 1][0] + grid[row][0];
  }

  //* Handle case where we only move right
  for (let col = 1; col < m; col++) {
    dp[0][col] = dp[0][col - 1] + grid[0][col];
  }

  for (let row = 1; row < n; row++) {
    for (let col = 1; col < m; col++) {
      dp[row][col] =
        //* Either take the value from above or to the left
        Math.min(dp[row - 1][col], dp[row][col - 1]) + grid[row][col];
    }
  }

  //* Minimum sum to get to this cell
  return dp[n - 1][m - 1];
}

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
); //* 7

console.log(minPathSum([[1, 2, 3]])); //* 6

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

//* Space: O(n + m) - There are n * m unique states, thus, there are n * m unique keys in the worst case
