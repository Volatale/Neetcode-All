//* Apply a BFS-like traversal over the surrounding cells
//* We essentially only care about the MIDDLE cells in the input matrix
//* The "new" matrix has half the size of the original
//*     - So we iterate up to n - 2 times in both dimensions
//* When we want to update the new matrix, we need to remember to offset by - 1
//*     - We searched for surrounding cells starting from (1, 1), so the offset was + 1 originally
//*     - But we need to overwrite (0, 0) in the new matrix, so we subtract 1 from each dimension
function largestLocal(grid) {
  //* The input is a square matrix
  const n = grid.length;

  //* We need to create a new matrix
  const newMatrix = new Array(n - 2)
    .fill(0)
    .map(() => new Array(n - 2).fill(0));

  const directions = [
    [-1, -1], //* Up-left
    [0, -1], //* Up
    [1, -1], //* Up-right
    [-1, 0], //* Left
    [0, 0], //* Center
    [1, 0], //* Right
    [-1, 1], //* Down-left
    [0, 1], //* Down
    [1, 1], //* Right
  ];

  //* Find the largest local values for all of the "middle" cells
  for (let row = 1; row <= n - 2; row++) {
    for (let col = 1; col <= n - 2; col++) {
      let largest = -Infinity;

      //* Check all of the neighbors
      for (const [r, c] of directions) {
        const newRow = row + r;
        const newCol = col + c;

        largest = Math.max(largest, grid[newRow][newCol]);
      }

      //* Update value in new matrix (remember to offset with - 1)
      newMatrix[row - 1][col - 1] = largest;
    }
  }

  return newMatrix;
}

console.log(
  largestLocal([
    [9, 9, 8, 1],
    [5, 6, 2, 6],
    [8, 2, 6, 4],
    [6, 2, 2, 2],
  ])
); //* [[9, 9], [8, 6]]

console.log(
  largestLocal([
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 2, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ])
); //* [[2, 2, 2], [2, 2, 2], [2, 2, 2]]

//* Time: O(n^2) - The time taken to create the new matrix scales at a rate of (n-2))^2
//* But we also have to iterate over the input matrix, which scales with "n" in size

//* Space: O(n^2) - The size of the "new" matrix is (n-2)^2, so it uses a quadratic amount of space
