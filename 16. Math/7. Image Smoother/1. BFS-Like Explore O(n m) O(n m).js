//* Apply a BFS-like approach to explore all 8 neighbors of the current cell
//* We also need to track the number of cells that are within bounds in each "surrounding search"
//* For each cell, we need to calculate the average
//*     - Add the surrounding cells to the sum
//*     - Increment the number of "included" cells (this is the divisor of average)
//*     - matrix[row][col] = Math.floor(sum / cells)
function imageSmoother(img) {
  function inBounds(row, col) {
    return row >= 0 && row < ROWS && col >= 0 && col < COLS;
  }

  const directions = [
    [-1, -1], //* Up-left
    [0, -1], //* Up
    [1, -1], //* Up-right
    [-1, 0], //* Left
    [0, 0], //* Center
    [1, 0], //* Right
    [-1, 1], //* Down-left
    [0, 1], //* Down
    [1, 1], //* Right
  ];

  const ROWS = img.length;
  const COLS = img[0].length;

  //* A new matrix to avoid modifyin the input
  const matrix = new Array(ROWS).fill(0).map(() => new Array(COLS).fill(0));

  //* Iterate over every cell in the input and sum each direction
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let sum = 0;
      let cells = 0;

      //* Check the surrounding cells and sum them
      for (const [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        if (inBounds(newRow, newCol)) {
          sum += img[newRow][newCol];
          cells++;
        }
      }

      //* The "smoothed" cell is the average of the sum of the 8 (+ this cell) surrounding cells
      matrix[row][col] = Math.floor(sum / cells);
    }
  }

  return matrix;
}

console.log(
  imageSmoother([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
); //* [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

console.log(
  imageSmoother([
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ])
); //* [[4, 4, 5, 6, 7], [6, 7, 8, 9, 9], [11, 12, 13, 14, 14], [16, 17, 18, 19, 19], [19, 19, 20, 21, 22]];

console.log(
  imageSmoother([
    [100, 200, 100],
    [200, 50, 200],
    [100, 200, 100],
  ])
); //* [[137, 141, 137], [141, 138, 141], [137, 141, 137]]

console.log(imageSmoother([[1, 2, 3]])); //* [[1, 2, 2]]

//* Time: O(n * m) - We have to iterate over every row/column position
//* Within each inner iteration, we have an O(9) loop to check the neighboring positions
//* But O(9 * n * m ) simplifies to O(n * m)

//* Space: O(n * m) - We created a new matrix to store the "filtered" values
