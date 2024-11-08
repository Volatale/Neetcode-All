//* We need to travel in this order: right -> down -> left -> up -> right ...
//*     - So there is a cyclic list of directions we can use
//* Use an array of tuples that contain the change in x and the change in y to reach the new cell
//*     - The logic is the same as BFS
//! In this version, we don't need to actually track our visited cells
//*     - The values will always be larger than 0
//*     - So we can simply check for visited cells via matrix[row][col] !== -1
//* Keep moving while values.length < totalCells (ROWS * COLS = the number of cells)
//*     - The new row is row + r and the new column is col + c
//*     - If this cell is in bounds, and hasn't already been visited, then we can move to the cell
//!     - Otherwise, we need to change directions
//*         - The NEW direction is direction = (direction + 1) % 4
//*         - In other words, if we are at direction 3 (up), we'll cycle back around to 0 (right)
//!     - Since this is a WHILE loop, we technically aren't progressing, but we ARE correcting our movement path
function generatedMatrix(n) {
  function isInBounds(row, col) {
    return row >= 0 && col >= 0 && row < n && col < n;
  }

  //* There is only 1 number
  if (n === 1) return [[1]];

  const totalCells = n * n;

  //* All of the values will be greater than -1
  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(-1));
  matrix[0][0] = 1; //* Initialize first cell

  let row = 0;
  let col = 0;
  let val = 2; //* Value of next cell
  let dir = 0; //* Cycle between the directions

  const directions = [
    [0, 1], //* Right (0)
    [1, 0], //* Down (1)
    [0, -1], //* Left (2)
    [-1, 0], //* Up (3)
  ];

  //* Populate the entire matrix
  while (val <= totalCells) {
    const [r, c] = directions[dir];
    const newRow = row + r;
    const newCol = col + c;

    if (isInBounds(newRow, newCol) && matrix[newRow][newCol] === -1) {
      row = newRow;
      col = newCol;
      matrix[row][col] = val;
      val++;
    } else {
      //* Cell is out of bounds or already visited
      dir = (dir + 1) % 4;
    }
  }

  return matrix;
}

console.log(generatedMatrix(1)); //* [[1]]
console.log(generatedMatrix(3)); //* [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
console.log(generatedMatrix(5));

//* Time: O(n^2m) - There are n^2 rows and columns, and it takes O(n^2) to build the new matrix
//* Within each iteration, we do a constant amount of work, regardless of input size

//* Space: O(n^2) - We have to create a new matrix, of size n x n
//* Other than that, we us O(4) space to create the directions array, but that is constant
