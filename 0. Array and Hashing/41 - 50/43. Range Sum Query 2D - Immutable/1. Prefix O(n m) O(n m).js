class NumMatrix {
  constructor(matrix) {
    if (matrix.length === 0 || matrix[0].length === 0) return;

    const n = matrix.length;
    const m = matrix.length;

    this.dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));

    debugger;
    //* Initialize DP array with prefix sums
    for (let row = 1; row <= m; row++) {
      for (let col = 1; col <= n; col++) {
        this.dp[row][col] =
          matrix[row - 1][col - 1] +
          this.dp[row - 1][col] +
          this.dp[row][col - 1] -
          this.dp[row - 1][col - 1];
      }
    }
  }

  sumRegion(row1, col1, row2, col2) {
    return (
      this.dp[row2 + 1][col2 + 1] -
      this.dp[row1][col2 + 1] -
      this.dp[row2 + 1][col1] +
      this.dp[row1][col1]
    );
  }
}

const matrix = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5],
]);
