//* Iterate through the entire input
//* Reverse the [row][col] to be [col][row] in the NEW matrix
function transpose(matrix) {
  if (matrix.length === 1 && matrix[0].length === 1) return matrix;

  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  //* Create a new matrix where ROWS -> COLS and COLS -> ROWS
  const newMatrix = new Array(COLS).fill(0).map(() => new Array(ROWS).fill(0));

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      newMatrix[col][row] = matrix[row][col];
    }
  }

  return newMatrix;
}

console.log(
  transpose([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

console.log(
  transpose([
    [1, 2, 3],
    [4, 5, 6],
  ])
);

console.log(transpose([[1], [2], [3]]));
console.log(transpose([[1, 2, 3]]));

//* Time: O(n * m) - It takes O(n * m) to iterate through the input
//* Within each iteration, we do O(1) work since we are just assigning values to an index

//* Space: O(m * n) - We have to create a new matrix of size m * n (space usage is the same as n * m)
