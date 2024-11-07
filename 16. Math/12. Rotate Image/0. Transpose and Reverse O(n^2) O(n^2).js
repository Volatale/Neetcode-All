//* Geometrically speaking, a rotation by 90 degrees
//*     - Is the same as a transpose followed by a reverse to every row
//* Transposing is essentially flipping / swapping values along a diagonal mirror
//*     - We only have to swap the values that AREN'T along the diagonal
//*     - So "col" should start from row + 1 (and row starts at 0)
function rotate(matrix) {
  const n = matrix.length;

  //* Transpose the matrix in place
  for (let row = 0; row < n; row++) {
    for (let col = row + 1; col < n; col++) {
      const temp = matrix[row][col];
      matrix[row][col] = matrix[col][row];
      matrix[col][row] = temp;
    }
  }

  //* Reverse each row
  for (let row = 0; row < n; row++) {
    matrix[row].reverse();
  }

  return matrix;
}

console.log(
  rotate([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); //* [[7 ,4 ,1], [8, 5, 2], [9, 6, 3]]

console.log(
  rotate([
    [5, 1, 9, 11],
    [2, 4, 8, 10],
    [13, 3, 6, 7],
    [15, 14, 12, 16],
  ])
); //* [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]

//* Time: O(n^2) - Transposing the matrix takes O(n^2) time since we have n * n iterations
//* Then, it takes O(n^2) to reverse each row. Each row takes O(n) and there are "n" rows (n * n)

//* Space: O(1) - We are doing everything in place, so the space usage remains constant regardless of input ssize
