//* Counting the number of ways to do something is combinatorics
//*     - Combinatorics = Math, Brute Force, Dynamic Programming etc
//* Rule of Sum applies
//*     - We can EITHER move down OR right (mutual exclusion)
//* (ROWS - 1, COLS - 1) makes it easier to conceptualize the grid
//*     - Indexing into index "n" or "m" makes no sense as that would be out of bounds
//* This is top down, so technically we are going UP and LEFT
//*     - So we travel to the TOP-LEFT instead of BOTTOM-RIGHT
//* Sum the total number of ways from BOTH paths
//*     - Optimal substructure exists
//*     - Overlapping subproblems exist

//* If we encounter a cell that is a 1 (obstacle), return 0
//*     - This is an invalid path, thus it cannot be counted

//! Recurrence Relation: F(m, n) = F(m - 1, n) + F(m, n - 1)
function uniquePathsWithObstacles(obstacleGrid) {
  function countPaths(row, col) {
    //* Base Case: Either out of bounds, or found an obstacle
    if (row < 0 || col < 0 || obstacleGrid[row][col] === 1) return 0;

    //* Base Case: Found valid path
    if (row === 0 && col === 0) return 1;

    return countPaths(row - 1, col) + countPaths(row, col - 1);
  }

  const ROWS = obstacleGrid.length;
  const COLS = obstacleGrid[0].length;

  //* Impossible to find a path, either the start or end is blocked
  if (obstacleGrid[0][0] === 1 || obstacleGrid[ROWS - 1][COLS - 1]) return 0;

  return countPaths(ROWS - 1, COLS - 1);
}

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0],
  ])
); //* 2

console.log(
  uniquePathsWithObstacles([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ])
);

console.log(uniquePathsWithObstacles([[0, 0, 0]])); //* 1

console.log(
  uniquePathsWithObstacles([
    [0, 0, 1],
    [0, 1, 0],
  ])
); //* 0

console.log(uniquePathsWithObstacles([[0, 0, 1]])); //* 0

console.log(
  uniquePathsWithObstacles([
    [0, 1],
    [0, 0],
  ])
); //* 1

console.log(
  uniquePathsWithObstacles([
    [0, 0],
    [0, 1],
    [0, 0],
  ])
); //* 1

//* Time: O(2^(n + m)) - At each step, we make two additional calls
//* The branching factor is 2 and the depth of the recursion tree is m + n

//* Space: O(n + m) - The depth of the recursion tree scales with "m" + "n"
//* Even if m is 10, if we are at row 0, we'd still need to keep decreasing the columns
