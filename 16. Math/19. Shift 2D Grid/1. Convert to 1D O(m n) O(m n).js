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

  //* An array to hold the flattened matrix's shifted form
  const flattened = new Array(totalCells).fill(0);

  //* Iterate through the matrix and add all the values to the flattened array
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = (row * COLS + col + k) % totalCells; //* 2D to 1D index
      flattened[index] = grid[row][col];
    }
  }

  //* Modify the values in the matrix based on the flattened values
  for (let i = 0; i < flattened.length; i++) {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    grid[row][col] = flattened[i];
  }

  return grid;
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
//* Then we iterate through the entire matrix twice

//* Space: O(m * n) - We need to create a 1D array whose size scales with the number of rows and columns
