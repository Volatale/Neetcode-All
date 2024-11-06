//! Follow-Up for SQUARE MATRIX
//* Swap the values in place; use a temp variable
//* The final column ends up being in the correct order without explicit modification
function transpose(matrix) {
  if (matrix.length === 1) return matrix;

  //* The matrix is square, so it is always n * n
  const n = matrix.length;

  //* Since the matrix is square, we can just SWAP the values in place
  for (let row = 0; row < n; row++) {
    for (let col = row + 1; col < n; col++) {
      const temp = matrix[row][col];
      matrix[row][col] = matrix[col][row];
      matrix[col][row] = temp;
    }
  }

  return matrix;
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

//* Time: O(n^2) - It takes O(n^2) to iterate through the input
//* Within each iteration, we do O(1) work since we are just assigning values to an index

//* Space: O(1) - There is no need to create a new matrix; we are simply swapping values in place
//* The memory usage remains the same regardless of input size
