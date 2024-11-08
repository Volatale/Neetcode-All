//* Using some observation, we can identify that it is always possible to take the top row
//* Add the entire top row to the values array
//* Then, we can ROTATE the matrix counter-clockwise
//*     - This is done through transposition, and then reversing the COLUMNS
//*         - Reversing the ROWS here would be a CLOCKWISE rotation
//*     - After completing these steps, the "next" row we need will be the TOP row
//*     - Keep doing this until there are no more elements to process
function spiralMatrix(matrix) {
  //* Handle empty matrix case
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  const values = [];

  while (matrix.length > 0) {
    //* Add the top row to the values array
    values.push(...matrix[0]);

    //* Remove the top row
    matrix = matrix.splice(1);

    //* Rotate matrix left (transpose -> reverse all columns)
    matrix = rotateCounterClockwise(matrix);
  }

  return values;
}

function rotateCounterClockwise(matrix) {
  //* The matrix is empty
  if (matrix.length === 0 || matrix[0].length === 0) return [];

  let ROWS = matrix.length;
  let COLS = matrix[0].length;

  const newMatrix = new Array(COLS).fill(0).map(() => new Array(ROWS).fill(0));

  //* Transpose the matrix
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      newMatrix[col][row] = matrix[row][col];
    }
  }

  ROWS = newMatrix.length;
  COLS = newMatrix[0].length;

  //* Reverse each column to achieve counterclockwise rotation
  for (let col = 0; col < COLS; col++) {
    let top = 0;
    let bottom = ROWS - 1;

    while (top < bottom) {
      const temp = newMatrix[top][col];
      newMatrix[top][col] = newMatrix[bottom][col];
      newMatrix[bottom][col] = temp;
      top++;
      bottom--;
    }
  }

  return newMatrix;
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
