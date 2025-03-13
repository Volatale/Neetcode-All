//! We can binary search on the ENTIRE matrix at once (rows and columns)
//* Product Rule of logarithm:
//*     - log2(n) + log2(m) === log2(n * m)
//* We are searching for an element within the matrix
//*     - And the rows and columns are (at least) monotonically non-decreasing
//! Thus, the search space is the sorted, and the search space is limited to:
//*     - left = 0
//*     - right = (n * m) - 1
//* If matrix[mid] === target
//*     - Then we have found our target
//* Else if, matrix[mid] < target
//*     - So we need to find a LARGER target
//*     - Eliminate the search space on the left (to try a larger value)
//* Else, the element is too LARGE
//*     - So we need a smaller value
//*     - Eliminate the search space on the right
function searchMatrix(matrix, target) {
  //* Size of the grid
  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  //* The search space is the matrix itself
  let left = 0;
  let right = ROWS * COLS - 1;

  while (left < right) {
    //* The 1D index we are checking to find target
    const mid = left + ((right - left) >> 1);

    //* Convert the 1D index into a 2D index
    const row = Math.floor(mid / COLS);
    const col = mid % COLS;

    if (matrix[row][col] >= target) {
      right = mid; //* We either found the value or we need a smaller value
    } else {
      left = mid + 1; //* We need a larger value
    }
  }

  //* Check if the element exists in the matrix
  return matrix[Math.floor(left / COLS)][left % COLS] === target ? true : false;
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

console.log(searchMatrix([[1]], 1)); //* True
console.log(searchMatrix([[1], [2], [3]], 4)); //* False
console.log(searchMatrix([[1], [2], [3]], 2)); //* True
console.log(searchMatrix([[5, 10, 15, 20, 25, 30]], 10)); //* True
console.log(searchMatrix([[5, 10, 15, 20, 25, 30]], 50)); //* False

//* Time: O(log(n * m)) - Product Rule of Logarithms: log_b(n) + log_b(m) = log(n * m)
//* We are binary searching over the entire matrix at once

//* Space: O(1) - The memory usage remains constant regardless of the input size
