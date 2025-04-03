class NumMatrix {
  constructor(matrix) {
    this.m = matrix.length;
    this.n = matrix[0].length;
    this.ST = new Array(2 * this.m)
      .fill(0)
      .map(() => new Array(2 * this.n).fill(0));
    this.#build(matrix);
  }

  #build(matrix) {
    //* Populate the leaf nodes
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.ST[i + this.m][j + this.n] = matrix[i][j];
      }
    }

    //* Build row-wise STs
    for (let i = this.m - 1; i > 0; i--) {
      for (let j = 0; j < this.n; j++) {
        this.ST[i][j + this.n] =
          this.ST[i << 1][j + this.n] + this.ST[(i << 1) | 1][j + this.n];
      }
    }

    //* Build column-wise STs
    for (let i = 1; i < 2 * this.m; i++) {
      for (let j = this.n - 1; j > 0; j--) {
        this.ST[i][j] = this.ST[i][j << 1] + this.ST[i][(j << 1) | 1];
      }
    }
  }

  sumRegion(row1, col1, row2, col2) {
    let sum = 0;

    row1 += this.m;
    row2 += this.m;

    while (row1 <= row2) {
      if (row1 & 1) {
        sum += this.#rangeQuery(row1++, col1, col2);
      }

      if ((row2 & 1) === 0) {
        sum += this.#rangeQuery(row2--, col1, col2);
      }

      row1 >>= 1;
      row2 >>= 1;
    }

    return sum;
  }

  #rangeQuery(row, left, right) {
    left += this.n;
    right += this.n;

    let sum = 0;

    while (left <= right) {
      if (left & 1) {
        sum += this.ST[row][left++];
      }

      if ((right & 1) === 0) {
        sum += this.ST[row][right--];
      }

      left >>= 1;
      right >>= 1;
    }

    return sum;
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
