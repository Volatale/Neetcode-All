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

//* Apply memoization to reduce redundant work
//*     - DP will work here because the matrix (graph) does not allow for cyclic movement
//*         - In other words, the matrix allows for "directed" movement
//*     - Each subproblem (prerequisite) will be solved prior to the time we need it
function maximalSquare(matrix) {
  function findArea(row, col) {
    //* Either out of bounds or we found a 0
    if (!isValid(row, col) || matrix[row][col] === "0") return 0;

    //* Utilize memoized value
    if (dp[row][col] !== -1) return dp[row][col];

    return (
      //* Move in all 3 directions and take the minimum and add 1 (this cell)
      (dp[row][col] =
        Math.min(
          findArea(row, col + 1), //* Right
          findArea(row + 1, col + 1), //* Down-right
          findArea(row + 1, col + 1) //* Down
        ) + 1)
    );
  }

  function isValid(row, col) {
    return row >= 0 && col >= 0 && row < n && col < m;
  }

  const n = matrix.length;
  const m = matrix[0].length;

  //* dp[i][j] = Largest square starting at this cell
  const dp = new Array(n).fill(0).map(() => new Array(m).fill(-1));

  let maxSide = 0;

  //* Try finding the path from every cell
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      if (matrix[row][col] === "1") {
        const side = findArea(row, col);
        maxSide = Math.max(maxSide, side);
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

//* Time: O(n * m)) - We are memoizing the results of each subproblem
//* Iterating over the entire matrix takes O(n * m) time alone
//* We only compute each subproblem a single time, so we lose the exponential nature
//* There are "n" possible values for rows and "m" possible values for columns (n * m) = O(n * m)

//* Space: O(m * n) - The height of the recursion tree scales with the minimum of the two dimensions
//* The DP matrix scales in size with the number of rows and columns
