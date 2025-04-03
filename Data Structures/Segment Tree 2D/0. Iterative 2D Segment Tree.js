//* We need a seperate Segment Tree for each row and each column
//* Thus, in total, there are m + n (ROWS + COLS) Segment Trees
//* For a query (row1, col1, row2, col2)
//*     - The ROW coordinates use the COLUMN-WISE Segment Tree (they move up because the parent is ABOVE)
//*     - The COLUMN coordinates use the ROW-WISE Segment Tree (they move left because the parent is to the LEFT)
//!         - The above are assuming we conceptualize the 2D Segment Tree as a 2D matrix
//!           where the bottom-right (m x n) grid holds the LEAF nodes
class SegmentTree2D {
  constructor(matrix) {
    this.m = matrix.length; //* ROWS
    this.n = matrix[0].length; //* COLUMNS
    this.ST = new Array(2 * this.m)
      .fill(0)
      .map(() => new Array(2 * this.n).fill(0));
    this.#build(matrix);
  }

  #build(matrix) {
    //* Leaf nodes (matrix elements) are stored in the bottom-right (m x n) cells
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.ST[i + this.m][j + this.n] = matrix[i][j];
      }
    }

    //* Build the ROW-WISE internal nodes FIRST
    for (let i = this.m - 1; i > 0; i--) {
      for (let j = 0; j < this.n; j++) {
        this.ST[i][j + this.n] =
          this.ST[i << 1][j + this.n] + this.ST[(i << 1) | 1][j + this.n];
      }
    }

    //* Then, build the COLUMN-WISE internal nodes
    for (let i = 0; i < this.m * 2; i++) {
      for (let j = this.n - 1; j > 0; j--) {
        this.ST[i][j] = this.ST[i][j << 1] + this.ST[i][(j << 1) | 1];
      }
    }
  }

  //* The top and bottom of our (query) rectangle is (row1, row2)
  //* Compute the sum of [col1, col2] for each "valid" row
  sumRegion(row1, col1, row2, col2) {
    //* Move to the leaf nodes for all coordinates
    row1 += this.m;
    row2 += this.m;

    let sum = 0;

    //* Find the necessary row-wise Segment Trees
    //* Then, use the column-wise Segment Trees (perform a range query [col1, col2] for each)
    while (row1 <= row2) {
      if (row1 & 1) {
        sum += this.#rangeQuery(row1++, col1, col2);
      }

      if ((row2 & 1) === 0) {
        sum += this.#rangeQuery(row2--, col1, col2);
      }

      //* Move to the parents of this row
      row1 >>= 1;
      row2 >>= 1;
    }

    return sum;
  }

  //* Calculates the sum of the query [col1, col2] using the column-wise Segment Trees
  #rangeQuery(row, left, right) {
    let sum = 0;

    //* Move to the leaf nodes in the current Segment Tree
    left += this.n;
    right += this.n;

    while (left <= right) {
      if (left & 1) {
        sum += this.ST[row][left++];
      }

      if ((right & 1) === 0) {
        sum += this.ST[row][right--];
      }

      //* Move to the parents of each node
      left >>= 1;
      right >>= 1;
    }

    return sum;
  }

  //* Each leaf node is related to TWO Segment Trees (Row and Column)
  //* Thus, when we update a leaf node, we need to rebuild BOTH Segment Trees
  update(row, col, val) {
    //* Move to the leaf nodes (bottom-right m x n cells)
    row += this.m;
    col += this.n;

    //* BOTH Segment Trees depend on the above pointers; make copies
    //* When we rebuild one of the Segment Trees, row and column are modified
    let r = row;
    let c = col;

    //* Update the value at this index to "val"
    this.ST[row][col] = val;

    //* Rebuild column-wise Segment Tree
    while (c > 1) {
      c >>= 1;
      this.ST[row][c] = this.ST[row][c << 1] + this.ST[row][(c << 1) | 1];
    }

    //* Rebuild the row-wise Segment Trees too
    while (r > 1) {
      r >>= 1;

      //* Handles rebuilding the column-wise Segment Trees stored in the valid rows
      for (let j = col; j > 0; j >>= 1) {
        this.ST[r][j] = this.ST[r << 1][j] + this.ST[(r << 1) | 1][j];
      }
    }
  }
}

//* FIRST Segment Tree
const ST = new SegmentTree2D([
  [3, 4, 7],
  [1, 0, 2],
  [3, 2, 1],
]);

console.log("\nFirst Segment Tree");
console.log(ST.sumRegion(0, 0, 2, 2)); //* 23
console.log(ST.sumRegion(0, 0, 0, 2)); //* 14 (top row)
console.log(ST.sumRegion(1, 2, 1, 2)); //* 2
console.log(ST.sumRegion(1, 0, 2, 0)); //* 4
ST.update(1, 1, 6);
console.log(ST.sumRegion(0, 0, 2, 2)); //* 29

//* SECOND Segment Tree
const STII = new SegmentTree2D([
  [3, 4],
  [3, 2],
]);

console.log("\nSecond Segment Tree");
console.log(STII.sumRegion(0, 0, 1, 1)); //* 12
STII.update(1, 1, 4);
console.log(STII.sumRegion(0, 0, 1, 1)); //* 14
