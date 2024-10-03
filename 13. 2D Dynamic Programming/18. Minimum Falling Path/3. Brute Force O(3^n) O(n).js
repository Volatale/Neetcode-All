//* We need to find the minimum falling
//*     - Start our function from any of the top row's cells
//* From each cell, we can move down-left, down or down-right
//*     - So there are 3 choices at each step
//*     - Take the minimum from each of these choices
//* Use a brute force approach
//*     - There is no heuristic we can apply to know where to start
//*     - So we should try starting at each of the cells on the top row
function minFallingPathSum(matrix) {
  function findPath(row, col) {
    //* Base Case: Out of bounds
    if (col < 0 || col === n) return Infinity;

    //* Base Case: Reached bottom cell
    if (row === n - 1) return matrix[row][col];

    return (
      Math.min(
        findPath(row + 1, col - 1), //* Down-left
        findPath(row + 1, col), //* Down
        findPath(row + 1, col + 1) //* Down-right
      ) + matrix[row][col]
    );
  }

  const n = matrix.length;
  let minPath = Infinity;

  //* Try starting from every cell on the top row
  for (let col = 0; col < n; col++) {
    minPath = Math.min(minPath, findPath(0, col));
  }

  return minPath;
}

console.log(
  minFallingPathSum([
    [2, 1, 3],
    [6, 5, 4],
    [7, 8, 9],
  ])
); //* 13

console.log(
  minFallingPathSum([
    [-19, 57],
    [-40, -5],
  ])
); //* -59

//* Time: O(n * 3^n) - Each call results in 3 more calls
//* The depth of the recursion tree scales with the number of rows (n)
//* Branching Factor ^ height of recursion tree = 3^n
//* We perform an outer level call for every cell on the top level

//* Space: O(n) - The height of the recursion tree scales with the number of rows
