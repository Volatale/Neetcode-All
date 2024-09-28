//* Matrix problems can be visualized as GRAPH problems
//*     - In our case, we have a DAG (directed acyclic graph)
//*         - We can only move DOWN and RIGHT at each step
//*         - So we know each cell has TWO prerequisite subproblems (like a topological sort)
//*             - Both of these subproblems will be computed by the time we need their values
//* Greedy would work if we used a Min Heap
function minPathSum(grid) {
  function findPath(row, col) {
    //* Base Case: Out of Bounds
    if (row === n || col === m) return Infinity;

    //* Base Case: Found bottom-right cell
    if (row === n - 1 && col === m - 1) return grid[row][col];

    return (
      Math.min(
        findPath(row + 1, col), //* Go Down
        findPath(row, col + 1) //* Go Right
      ) + grid[row][col] //* Add the current cell
    );
  }

  const n = grid.length;
  const m = grid[0].length;

  return findPath(0, 0);
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

//* Time: O(2^(n + m)) - There are two choices to make at each cell
//* Either move down or move right, so the branching factor is 2
//* The height of the recursion tree scales with the sum of n and m
//* Even if we move down all the way, we can still move right (n + m)

//* Space: O(n + m) - The height of the recursion tree scales with n + m
