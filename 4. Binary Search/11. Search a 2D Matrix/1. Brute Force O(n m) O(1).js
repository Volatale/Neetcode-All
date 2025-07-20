//* We are given an m x n integer matrix where:
//*     - Each row is sorted in non-decreasing order
//*     - The first integer of each row is GREATER than the last of the previous row
//* The goal is to find `target` within the matrix
//* In a brute force manner, we can simply iterate through the entire matrix and find the element
//* If it doesns't exist, just return false
function searchMatrix(matrix, target) {
  //* Search the entire matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
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

//* Time: O(n * m) - The time taken scales with the input size (no. of rows and columns)

//* Space: O(1) - The memory usage remains constant regardless of input size
