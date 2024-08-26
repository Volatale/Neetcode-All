//* At each step, we can either move DOWN or move RIGHT
//* Remain in bounds regardless of which direction we move
//* We want to take the MINIMUM result from each path and sum them

//* Apply tabulation to avoid recursion overhead
//* We no longer need to store the ROW itself as state
//*     - So the space can be reduced to the max no. of columns
function minimumTotal(triangle) {
  const ROWS = triangle.length;

  //* Initialize DP to the last row
  const dp = [...triangle[ROWS - 1]];

  //* Iterate from second to last row to the top
  for (let row = ROWS - 2; row >= 0; row--) {
    for (let col = 0; col <= row; col++) {
      dp[col] = Math.min(dp[col], dp[col + 1]) + triangle[row][col];
    }
  }

  return dp[0];
}

console.log(minimumTotal([[3], [4, 3], [3, 5, 8]]));
console.log(minimumTotal([[3], [4, 3]])); //* 6
console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); //* 11
console.log(minimumTotal([[-10]])); //* -10
console.log(minimumTotal([[1], [2, 3], [4, 5, 6]])); //* 6
console.log(minimumTotal([[10], [-5, 6], [20, 52, 4]])); //* 20

//* Time: O(n * m) - There are two non-constant parameters that our state depends on
//* "n" is the number of rows, and "m" is the number of columns
//* There are (n + 1) * (m + 1) unique subproblems

//* Space: O(m) - Where "m" is the maximum number of columns
