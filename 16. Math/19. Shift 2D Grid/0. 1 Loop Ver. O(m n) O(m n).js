//* We can convert between 2D matrix indices and 1D array indices
//*     - 2D -> 1D:
//*         - row * COLS + col
//*     - 1D -> 2D
//*         - row = Math.floor(index / COLS)
//*         - col = index % col
function shiftGrid(grid, k) {
  //* No shift needs to be performed
  if (k === 0) return grid;

  const ROWS = grid.length;
  const COLS = grid[0].length;

  const totalCells = ROWS * COLS;

  const matrix = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(0));

  //* Shift every value using the new matrix
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = (row * COLS + col + k) % totalCells; //* 2D to 1D index
      const newRow = Math.floor(index / COLS); //* 1D to 2D (rows)
      const newCol = index % COLS; //* 1D to 2D (columns)

      matrix[newRow][newCol] = grid[row][col];
    }
  }

  return matrix;
}

console.log(
  shiftGrid(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    1
  )
); //* [[9, 1, 2] ,[3 ,4, 5], [6, 7, 8]]

console.log(
  shiftGrid(
    [
      [3, 8, 1, 9],
      [19, 7, 2, 5],
      [4, 6, 11, 10],
      [12, 0, 21, 13],
    ],
    4
  )
); //* [[12, 0, 21, 13], [3, 8, 1, 9], [19, 7, 2, 5], [4, 6, 11, 10]]

console.log(
  shiftGrid(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    9
  )
); //* [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

//* Time: O(m * n) - It takes O(m * n) to create the new array
//* Then we iterate through the entire input matrix

//* Space: O(m * n) - We need to create a 2D matrix of equal size to the input
