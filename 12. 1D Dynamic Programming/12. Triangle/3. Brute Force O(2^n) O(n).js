//* At each step, we can either move DOWN or move RIGHT
//* Remain in bounds regardless of which direction we move
//* We want to take the MINIMUM result from each path and sum them
function minimumTotal(triangle) {
  function findMinimum(row, col) {
    if (col >= triangle[row].length) return Infinity; //* Out of bounds on that row
    if (row === ROWS - 1) return triangle[row][col]; //* Hit the bottom

    return (
      Math.min(
        findMinimum(row + 1, col), //* Go down
        findMinimum(row + 1, col + 1) //* Go right
      ) + triangle[row][col]
    );
  }

  const ROWS = triangle.length;

  //* Start from top, work your way down
  return findMinimum(0, 0);
}

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); //* 11
console.log(minimumTotal([[-10]])); //* -10
console.log(minimumTotal([[1], [2, 3], [4, 5, 6]])); //* 6
console.log(minimumTotal([[10], [-5, 6], [20, 52, 4]])); //* 20

//* Time: O(2^n) - At each step, we either go down or go right
//* So there are two choices to make at each level of recursion
//* We progress the state of each parameter by 1 each level
//* So branching factor * height of recursion tree = 2^n

//* Space: O(n) - Depth of recursion tree scales with number of rows
