//* The search space is the entire matrix
//* We *could* do two binary searches to find the element
//* But instead, we just binary search against the ENTIRE matrix at once
//* Our search space therefore becomes every index in the matrix
//* The formula to convert a 2D index to 1D is [row * COLS + col]
//* So reverse the calculation for 1D to 2D: [index / COLS][index % COLS]
//* "index" becomes "mid", % is used to prevent out of bounds
//* If element === target, we found the element
//* If element > target, we know mid is too large
//* Else, if element < target, we know mid is too small
function search2DMatrix(matrix, target) {
  const ROWS = matrix.length;
  const COLS = matrix[0].length;

  //* Search space is the matrix itself
  let left = 0;
  let right = ROWS * COLS - 1; //* - 1 to stop going out of bounds

  while (left <= right) {
    //* "mid" represents the index we want to search
    let mid = left + ((right - left) >> 1);

    //* The formula to convert a 2D index to 1D is [row * COLS + col]
    //* So reverse the calculation for 1D to 2D: [index / COLS][index % COLS]
    //* "index" becomes "mid", % is used to prevent out of bounds
    let element = matrix[Math.floor(mid / COLS)][mid % COLS];

    if (element === target) {
      return true;
    } else if (element > target) {
      right = mid - 1; //* This is a potential return value, don't eliminate mid
    } else {
      left = mid + 1; //* This element is too small, find a larger value
    }
  }

  //* Target does not exist in the array
  return false;
}

console.log(
  search2DMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
); //* True

console.log(
  search2DMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13
  )
); //* False

console.log(search2DMatrix([[1, 2, 3]], 3)); //* True

console.log(
  search2DMatrix(
    [
      [1, 2, 3],
      [4, 9, 13],
      [15, 17, 19],
    ],
    19
  )
); //* True

//* Time: O(log(n * m)) or O(log(n) + log(m))
//* We perform binary search on the entire matrix at once

//* Space: O(1) - The space usage remains constant regardless of input size
