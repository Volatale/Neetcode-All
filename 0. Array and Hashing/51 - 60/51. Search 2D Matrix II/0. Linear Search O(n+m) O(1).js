//* The matricies rows are sorted in values in ascending order
//* The same with the columns
//* So the matrix is sorted, we just can't say the first element of row + 1 > last of row
//* Nevertheless, we know elements on the RIGHT side of a column are larger
//* And elements on the TOP of the matrix are smaller
//* Therefore, if matrix[row][col] > target, we KNOW the right side column elements are larger
//* So decrease col by 1, this will result in a SMALLER number since the row is sorted
//* Likewise, if the element is too small, increase row
function search2DMatrixII(matrix, target) {
  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  //* Numbers on the LEFT of a row are smaller than numbers toward the right
  //* Numbers on TOP of a column are smaller than numbers toward the bottom
  let row = 0;
  let col = COLS - 1;

  while (row < ROWS && COLS >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      //* We need a SMALLER number
      //* "col" starts out as a HIGHER number, so decrease THIS, not row
      col--;
    } else {
      //* We need a LARGER number
      //* "row" starts out as a SMALLER number, so increase THIS
      row++;
    }
  }

  //* Element doesn't exist
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

//* Time: O(n + m) - In the worst case, we have to traverse through every row and column

//* Space: O(1) - The space usage remains constant regardless of the input size
