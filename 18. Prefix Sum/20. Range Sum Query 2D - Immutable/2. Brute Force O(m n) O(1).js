class NumMatrix {
  constructor(matrix) {
    this.matrix = matrix;
  }

  //* Iterate over the required indices and return the sum
  sumRegion(row1, col1, row2, col2) {
    let sum = 0;

    for (let row = row1; row <= row2; row++) {
      for (let col = col1; col <= col2; col++) {
        sum += this.matrix[row][col];
      }
    }

    return sum;
  }
}

const matrix = new NumMatrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

console.log(matrix.sumRegion(0, 0, 2, 2)); //* 45
console.log(matrix.sumRegion(0, 0, 1, 1)); //* 12
console.log(matrix.sumRegion(2, 1, 2, 1)); //* 8
console.log(matrix.sumRegion(0, 2, 2, 2)); //* 18

//* Time: O(m * n) - The setup takes O(1) since we just store a reference to the matrix
//* However, each call to sumRegion() takes O(m * n) - it depends on the number of rows and columns

//* Space: O(1) - We are merely storing a reference to the matrix passed into the constructor
