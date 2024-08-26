//* At each step, we can either move DOWN or move RIGHT
//* Remain in bounds regardless of which direction we move
//* We want to take the MINIMUM result from each path and sum them

//* Apply tabulation to avoid recursion overhead
function minimumTotal(triangle) {
  const ROWS = triangle.length;
  const COLS = triangle[ROWS - 1].length;

  //* dp[i][j] = Minimum sum we can get at row i column j
  const dp = new Array(ROWS + 1)
    .fill(0)
    .map(() => new Array(COLS + 1).fill(Infinity));

  //* Base Case: We start at the top, so just get the value there
  for (let col = 0; col < COLS; col++) {
    dp[ROWS - 1][col] = triangle[ROWS - 1][col];
  }

  //* Grab the values from BELOW
  for (let row = ROWS - 2; row >= 0; row--) {
    for (let col = 0; col <= row; col++) {
      dp[row][col] =
        Math.min(dp[row + 1][col], dp[row + 1][col + 1]) + triangle[row][col];
    }
  }

  return dp[0][0];
}

console.log(minimumTotal([[3], [4, 3]])); //* 6
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); //* 11
console.log(minimumTotal([[-10]])); //* -10
console.log(minimumTotal([[1], [2, 3], [4, 5, 6]])); //* 6
console.log(minimumTotal([[10], [-5, 6], [20, 52, 4]])); //* 20

//* Time: O(n * m) - There are two non-constant parameters that our state depends on
//* "n" is the number of rows, and "m" is the number of columns
//* There are (n + 1) * (m + 1) unique subproblems

//* Space: O(n * m) - There are n * m unique subproblems
//* So the matrix size scales with the number of rows and columns
