//* We are given an m x n integer matrix where:
//*     - Each row is sorted in non-decreasing order
//*     - The first integer of each row is GREATER than the last of the previous row
//* The goal is to find `target` within the matrix
//* Since the matrix is sorted, we can say it exhibits a monotonic property
//* The search space itself is the matrix itself
//*     - The possible indices are in the range [0, m * n - 1]
//* Thus, we can use a binary search approach to optimize our searching
//* So all we have to do is convert the 2D matrix index to a 1D representation
//*     - 1D to 2D:
//*         - Row = Math.floor(index / COLS)
//*         - Col = index % cols
//*     - 2D to 1D = (row * COLS + col)
//* If matrix[row][col] === target, then we found the target
//* Else if matrix[row][col] > target, we need to search the "left" portion of the matrix
//* Otherwise, matrix[row][col] < target, so we need to search the "right" portion
function searchMatrix(matrix, target) {
  //* Get the bounds (since they won't change)
  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  //* The search space is the matrix itself
  let left = 0;
  let right = ROWS * COLS - 1;

  while (left <= right) {
    //* `mid` represents the (1D) index we want to search
    const mid = left + ((right - left) >> 1);

    //* Convert this index to a 2D representation
    const newMid = matrix[Math.floor(mid / COLS)][mid % COLS];

    if (newMid === target) {
      return true;
    } else if (newMid > target) {
      right = mid - 1; //* Search the "left" of the matrix
    } else {
      left = mid + 1; //* Search the "right" of the matrix
    }
  }

  //* Target doesn't exist in the matrix
  return false;
}

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
); //* True

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13
  )
); //* False

console.log(searchMatrix([[1, 2, 3]], 3)); //* True

console.log(
  searchMatrix(
    [
      [1, 2, 3],
      [4, 9, 13],
      [15, 17, 19],
    ],
    19
  )
); //* True

//* Time: O(log(m*n)) - log(n) + log(m) = log(n * m); the search space is halved in each iteration
//* We are performing binary search on the entire index at once; the indeterminates are the no. of rows (n) and columns (m)

//* Space: O(1) - The memory usage remains constant regardless of input size
