//* Iterate through the matrix and track which rows and columns contain a 0
//* We don't need to store the entire cell ([row][col])
//!     - Simply checking if the current row exists in a row or col with a 0 is enough
//* However, there needs to be a distinction made between rows and columns
//*     - We can't just look at the row or column itself, we need an identifier
//*     - So something like "r-${row}" or "c-${col}" will work
//!         - Doing something like `${row}` or `${col}` is a bad idea
//* After determining which rows and columns contain
function setZeroes(matrix) {
  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  //* Contains cells
  const cells = new Set();

  //* Find all of the rows and columns that hold a 0
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      //* Mark this row and column (individually) as containing a 0
      if (matrix[row][col] === 0) {
        cells.add(`r-${row}`);
        cells.add(`c-${col}`);
      }
    }
  }

  //* Replace the values that exist in a row/column with a 0
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (cells.has(`r-${row}`) || cells.has(`c-${col}`)) {
        matrix[row][col] = 0;
      }
    }
  }

  return matrix;
}

console.log(
  setZeroes([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
); //* [[1, 0, 1], [0, 0, 0], [1, 0, 1]]

console.log(
  setZeroes([
    [0, 1, 2, 0],
    [3, 4, 5, 2],
    [1, 3, 1, 5],
  ])
); //* [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]

console.log(
  setZeroes([
    [1, 2, 3, 4],
    [5, 0, 7, 8],
    [0, 10, 11, 12],
    [13, 14, 15, 0],
  ])
); //* [[0, 0, 3, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

console.log(
  setZeroes([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ])
);

//* Time: O(n * m) - We iterate through the entire matrix twice (O(2 * (n * m)))
//* It takes Θ(1) to both perform lookups and add things to the set

//* Space: O(n + m) - There are "m" rows and "n" columns, and we are storing keys for each of them in the worst case
//* This ends up being n + m space usage
