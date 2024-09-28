//* Matrix problems can be visualized as GRAPH problems
//*     - In our case, we have a DAG (directed acyclic graph)
//*         - We can only move DOWN and RIGHT at each step
//*         - So we know each cell has TWO prerequisite subproblems (like a topological sort)
//*             - Both of these subproblems will be computed by the time we need their values
//* Greedy would work if we used a Min Heap

//* Apply memoization to avoid redundant work
//*     - We have 2D state (track the row and column)
function minPathSum(grid) {
  function findPath(row, col, memo) {
    //* Base Case: Out of Bounds
    if (row === n || col === m) return Infinity;

    //* Base Case: Found bottom-right cell
    if (row === n - 1 && col === m - 1) return grid[row][col];

    //* Utilize memoized value
    const key = `${row}-${col}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    return (memo[key] =
      Math.min(
        findPath(row + 1, col, memo), //* Go Down
        findPath(row, col + 1, memo) //* Go Right
      ) + grid[row][col]); //* Add the current cell
  }

  const n = grid.length;
  const m = grid[0].length;

  return findPath(0, 0, {});
}

console.log(
  minPathSum([
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ])
); //* 7

console.log(minPathSum([[1, 2, 3]])); //* 6

console.log(minPathSum([[10]])); //* 10

console.log(
  minPathSum([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
); //* 0

//* Time: O(n * m) - We are memoizing the results of each subproblem
//* There are "n" possible values for row and "m" possible values for col
//* Using the rule of product, we get n * m unique states

//* Space: O(n + m) - There are n * m unique states, thus, there are n * m unique keys in the worst case
//* The height of the recursion tree scales with n + m
