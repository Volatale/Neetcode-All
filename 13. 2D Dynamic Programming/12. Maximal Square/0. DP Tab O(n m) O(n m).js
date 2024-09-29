//* A square is made up of 4 sides
//*     - But in our case we need to remain in the bounds
//!     - Cells that have a "0" do not count, so a "0" cell is another base case
//* Area of Square = a^2, where "a" is a side
//*     - This is why we return side * side (side^2)
//* We add one because we need to count the current cell
//*     [1] would mean all 3 calls return 0, then, 0 + 1 gives us an area of 1
//* We have 3 choices in where we want to move at each cell
//*     - Move right
//*     - Move down-right
//*     - Move down
//! There is no way to travel BACK UP
//*     - In other words, the matrix does NOT allow for cyclic movement
//*     - Therefore we could apply dynamic programming to reduce redundant work

//* Apply tabulation to reduce redundant work
//*     - DP will work here because the matrix (graph) does not allow for cyclic movement
//*         - In other words, the matrix allows for "directed" movement
//*     - Each subproblem (prerequisite) will be solved prior to the time we need it
function maximalSquare(matrix) {
  if (matrix.length === 0) return 0;

  const n = matrix.length;
  const m = matrix[0].length;

  //* dp[i][j] = Largest square starting at this cell
  const dp = new Array(n + 1).fill(0).map(() => new Array(m + 1).fill(0));

  let maxSide = 0;

  //* Try every cell as a potential starting point
  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= m; col++) {
      if (matrix[row - 1][col - 1] === "1") {
        dp[row][col] =
          Math.min(
            dp[row - 1][col], //* Up
            dp[row - 1][col - 1], //* Up-left
            dp[row][col - 1] //* Left
          ) + 1;

        maxSide = Math.max(maxSide, dp[row][col]);
      }
    }
  }

  //* Area of square = a^2 where "a" is a side
  return maxSide * maxSide;
}

console.log(maximalSquare([["1"]])); //* 1

console.log(
  maximalSquare([
    ["1", "1"],
    ["1", "1"],
  ])
); //* 4

console.log(maximalSquare([["0"]])); //* 0

console.log(
  maximalSquare([
    ["1", "0"],
    ["1", "0"],
  ])
); //* 1

console.log(
  maximalSquare([
    ["0", "0", "0"],
    ["0", "0", "0"],
  ])
); //* 0

console.log(
  maximalSquare([
    ["1", "1", "1"],
    ["1", "1", "1"],
    ["1", "1", "1"],
  ])
); //* 9

//* Time: O(n * m)) - We are caching the results of each subproblem
//* Iterating over the entire matrix takes O(n * m) time alone
//* We only compute each subproblem a single time, so we lose the exponential nature
//* There are "n" possible values for rows and "m" possible values for columns (n * m) = O(n * m)

//* Space: O(m * n) - The DP matrix scales in size with the number of rows and columns
