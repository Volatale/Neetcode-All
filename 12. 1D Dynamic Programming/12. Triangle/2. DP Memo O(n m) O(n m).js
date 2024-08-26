//* At each step, we can either move DOWN or move RIGHT
//* Remain in bounds regardless of which direction we move
//* We want to take the MINIMUM result from each path and sum them

//* Apply memoization to avoid repeated work
function minimumTotal(triangle) {
  function findMinimum(row, col, memo) {
    if (col >= triangle[row].length) return Infinity; //* Out of bounds on that row
    if (row === ROWS - 1) return triangle[row][col]; //* Hit the bottom

    //* Utilize memoized value
    const key = `${row}-${col}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    return (memo[key] =
      Math.min(
        findMinimum(row + 1, col, memo), //* Go down
        findMinimum(row + 1, col + 1, memo) //* Go right
      ) + triangle[row][col]);
  }

  const ROWS = triangle.length;

  //* Start from top, work your way down
  return findMinimum(0, 0, {});
}

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])); //* 11
console.log(minimumTotal([[-10]])); //* -10
console.log(minimumTotal([[1], [2, 3], [4, 5, 6]])); //* 6
console.log(minimumTotal([[10], [-5, 6], [20, 52, 4]])); //* 20

//* Time: O(n * m) - There are two non-constant parameters that our state depends on
//* "n" is the number of rows, and "m" is the number of columns
//* There are (n + 1) * (m + 1) unique subproblems

//* Space: O(n * m) - Since there are n * m unique subproblems
//* In the worst case, there could be n * m keys/values in the memo object
//* Depth of recursion tree scales with number of rows
