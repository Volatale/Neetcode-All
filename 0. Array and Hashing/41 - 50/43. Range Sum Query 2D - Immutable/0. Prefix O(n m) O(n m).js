class NumMatrix {
  constructor(matrix) {
    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    this.dp = new Array(ROWS + 1)
      .fill(0)
      .map(() => new Array(COLS + 1).fill(0));

    for (let row = 0; row < ROWS; row++) {
      let prefix = 0;

      for (let col = 0; col < COLS; col++) {
        prefix += matrix[row][col];
        const above = this.dp[row][col + 1];
        this.dp[row + 1][col + 1] = prefix + above;
      }
    }
  }

  sumRegion(row1, col1, row2, col2) {
    //* Handle the offset created by ROWS + 1 && COLS +1
    row1++, col1++, row2++, col2++;

    const topLeft = this.dp[row1 - 1][col1 - 1];
    const above = this.dp[row1 - 1][col2];
    const left = this.dp[row2][col1 - 1];
    const bottomRight = this.dp[row2][col2];

    return bottomRight - above - left + topLeft;
  }
}

const matrix = new NumMatrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

matrix.sumRegion(0, 1, 1, 2);
