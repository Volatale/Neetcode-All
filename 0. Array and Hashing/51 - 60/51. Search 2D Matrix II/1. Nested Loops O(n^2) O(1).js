function search2DMatrixII(matrix, target) {
  //* Iterate through every element in matrix to find target
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === target) return true;
    }
  }

  //* Target doesn't exist in the matrix
  return false;
}

console.log(
  search2DMatrixII(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    5
  )
); //* True

console.log(search2DMatrixII([[1]], 1)); //* True

console.log(
  search2DMatrixII(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    8
  )
); //* True

console.log(
  search2DMatrixII(
    [
      [1, 4, 7, 11, 15],
      [2, 5, 8, 12, 19],
      [3, 6, 9, 16, 22],
      [10, 13, 14, 17, 24],
      [18, 21, 23, 26, 30],
    ],
    20
  )
); //* False

//* Time: O(n^2) - The number of rows and columns are both equal to "n"
//* We iterate through every row and column, so the time taken scales with n^2

//* Space: O(1) - We use a constant amount of space regardless of the input size
