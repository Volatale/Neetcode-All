//* We need to travel in this order: right -> down -> left -> up -> right ...
//*     - So there is a cyclic list of directions we can use
//* Use an array of tuples that contain the change in x and the change in y to reach the new cell
//*     - The logic is the same as BFS
//* Track the cells visited thus far, we shouldn't revisit the same cell
//*      - A set can help with this, just use the coordinate(s) as a key
//* Keep moving while values.length < totalCells (ROWS * COLS = the number of cells)
//*     - The new row is row + r and the new column is col + c
//*     - If this cell is in bounds, and hasn't already been visited, then we can move to the cell
//!     - Otherwise, we need to change directions
//*         - The NEW direction is direction = (direction + 1) % 4
//*         - In other words, if we are at direction 3 (up), we'll cycle back around to 0 (right)
//!     - Since this is a WHILE loop, we technically aren't progressing, but we ARE correcting our movement path
function spiralMatrix(matrix) {
  //* Handle empty matrix case
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  function isInBounds(row, col) {
    return row >= 0 && col >= 0 && row < ROWS && col < COLS;
  }

  const ROWS = matrix.length;
  const COLS = matrix[0].length;
  const totalCells = ROWS * COLS;

  const values = [];

  const directions = [
    [0, 1], //* Right (0)
    [1, 0], //* Down (1)
    [0, -1], //* Left (2)
    [-1, 0], //* Up (3)
  ];

  let direction = 0; //* Start by moving right
  let row = 0;
  let col = 0;

  const visited = new Set();
  visited.add(`${0}-${0}`);
  values.push(matrix[0][0]);

  while (values.length < totalCells) {
    const [r, c] = directions[direction];
    const newRow = row + r;
    const newCol = col + c;

    if (isInBounds(newRow, newCol) && !visited.has(`${newRow}-${newCol}`)) {
      //* Valid move
      row = newRow;
      col = newCol;
      values.push(matrix[row][col]);
      visited.add(`${row}-${col}`);
    } else {
      //* Change directions
      direction = (direction + 1) % 4;
    }
  }

  return values;
}

console.log(
  spiralMatrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); //* [1, 2, 3, 6, 9, 8, 7, 4, 5]

console.log(
  spiralMatrix([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
); //* [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

console.log(spiralMatrix([[1]])); //* [1]

console.log(spiralMatrix([[5, 9, 13]])); //* [5, 9, 13]

console.log(
  spiralMatrix([
    [10, 20],
    [40, 30],
  ])
); //* [10, 20, 30, 40]

//* Time: O(n * m) - Where n is the number of rows and m is the number of columns
//* Each cell is visited exactly once, and we do constant work per cell

//* Space: O(n * m) - We are tracking the cells that are visited, so this uses n * m space
//* The values array also scales the same way; a new value is pushed for each cell
