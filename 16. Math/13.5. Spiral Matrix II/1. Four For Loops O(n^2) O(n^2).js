//* We can explicitly define loop boundaries for each direction
//* Move the pointers after moving to the boundary in each direction
function generatedMatrix(n) {
  //* There is only 1 cell to populate
  if (n === 1) return [[1]];

  const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let val = 1;

  //* Four pointers to control loop boundaries
  let left = 0;
  let right = n - 1;
  let top = 0;
  let bottom = n - 1;

  while (left <= right) {
    //* Fill values in top row
    for (let col = left; col <= right; col++) {
      matrix[top][col] = val++;
    }

    top++;

    //* Fill values in right column
    for (let row = top; row <= bottom; row++) {
      matrix[row][right] = val++;
    }

    right--;

    //* Fill values in bottom row
    for (let col = right; col >= left; col--) {
      matrix[bottom][col] = val++;
    }

    bottom--;

    //* Fill values in left column
    for (let row = bottom; row >= top; row--) {
      matrix[row][left] = val++;
    }

    left++;
  }

  return matrix;
}

console.log(generatedMatrix(1)); //* [[1]]
console.log(generatedMatrix(3)); //* [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
console.log(generatedMatrix(5));

//* Time: O(n^2m) - There are n^2 rows and columns, and it takes O(n^2) to build the new matrix
//* Within each iteration, we do a constant amount of work, regardless of input size

//* Space: O(n^2) - We have to create a new matrix, of size n x n
//* Other than that, we us O(4) space to create the directions array, but that is constant
