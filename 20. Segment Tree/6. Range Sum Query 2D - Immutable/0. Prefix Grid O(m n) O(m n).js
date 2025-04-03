class NumMatrix {
  constructor(matrix) {
    this.m = matrix.length;
    this.n = matrix[0].length;

    //* prefix[i][j] = Sum of Rectangle from [0][0] to [i][j]
    //* 0-th row and column are used to eliminate edge cases
    this.prefix = new Array(this.m + 1)
      .fill(0)
      .map(() => new Array(this.n + 1).fill(0));

    //* Build the prefix grid
    for (let row = 1; row <= this.m; row++) {
      for (let col = 1; col <= this.n; col++) {
        this.prefix[row][col] =
          this.prefix[row - 1][col] + //* Cell above
          this.prefix[row][col - 1] + //* Cell on left
          matrix[row - 1][col - 1] - //* Value at the current index in the matrix
          this.prefix[row - 1][col - 1]; //* Top-left has been counted twice, remove one occurrence
      }
    }
  }

  sumRegion(row1, col1, row2, col2) {
    //* We have an extra row/column, so we need to add 1 to each argument to avoid out of bounds
    row1++, col1++, row2++, col2++;

    return (
      this.prefix[row2][col2] - //* Contains everything we need and more
      this.prefix[row2][col1 - 1] - //* Removes the column to the left of col1 that we need to exclude
      this.prefix[row1 - 1][col2] + //* Removes the row above row1 that we need to exclude
      this.prefix[row1 - 1][col1 - 1] //* Top-left value was removed twice, so add one back
    );
  }
}

console.log("First Matrix");
const numMatrix = new NumMatrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

console.log(numMatrix.sumRegion(0, 0, 2, 2)); //* 45
console.log(numMatrix.sumRegion(0, 0, 0, 2)); //* 6
console.log(numMatrix.sumRegion(1, 1, 1, 1)); //* 5
console.log(numMatrix.sumRegion(1, 1, 2, 2)); //* 28

console.log("\nSecond Matrix");
const numMatrixII = new NumMatrix([
  [1, 1],
  [1, 1],
]);

console.log(numMatrixII.sumRegion(0, 0, 1, 1)); //* 4
console.log(numMatrixII.sumRegion(0, 0, 0, 1)); //* 2
console.log(numMatrixII.sumRegion(1, 1, 1, 1)); //* 1
console.log(numMatrixII.sumRegion(0, 1, 1, 1)); //* 2

//* Time: O(m * n) - Building the prefix grid takes O(m * n)
//* But every range query takes O(1)

//* Space: O(m * n) - The memory usage scales with the number of rows and columns in the input matrix
