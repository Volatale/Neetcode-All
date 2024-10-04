//* We can make "maxMove" moves
//* Use DFS or BFs to travel between cells
//* If we go out of bounds, we found a valid way
//* Our "main" base case is if we have 0 moves left
//*     - Then return 0, this does not count as a valid path
//*     - By doing this check after the out of bounds check
//*         - We ensure that we know there can be no more possible moves
//*     - Every call, decrement moves by 1

//* Apply tabulation to avoid redundant work
//*     - We have 3D state (row, col, moves)
//* Use bitwise alternation to only require two "move" states in memory at the same time
function findPaths(m, n, maxMove, startRow, startColumn) {
  //* dp[move][i][j] = Number of ways we can get out of bound from row i, col j on move "move"
  const dp = new Array(2)
    .fill(0)
    .map(() => new Array(m).fill(0).map(() => new Array(n).fill(0)));

  const MOD = 10 ** 9 + 7;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  for (let move = 1; move <= maxMove; move++) {
    for (let row = 0; row < m; row++) {
      for (let col = 0; col < n; col++) {
        let ways = 0;

        //* Travel in all 4 directions
        for (const [r, c] of directions) {
          const newRow = row + r;
          const newCol = col + c;

          if (newRow < 0 || newCol < 0 || newRow >= m || newCol >= n) {
            //* We found an out of bounds path from this cell
            ways++;
          } else {
            //* We didn't go out of bounds, so accumulate the total ways
            ways += dp[(move - 1) & 1][newRow][newCol];
          }
        }

        dp[move & 1][row][col] = ways % MOD;
      }
    }
  }

  return dp[maxMove & 1][startRow][startColumn];
}

console.log(findPaths(2, 2, 2, 0, 0)); //* 6
console.log(findPaths(1, 3, 3, 0, 1)); //* 12
console.log(findPaths(3, 3, 2, 1, 1)); //* 4
console.log(findPaths(1, 1, 1, 0, 0)); //* 4
console.log(findPaths(1, 1, 0, 0, 0)); //* 0

//* Time: O(m * n * maxMove) - We are caching the results of each subproblem
//* There are "m" possible valus for row, "n" possible values for col and maxMove moves in total
//* The rule of product gives us m * n * maxMove unique subproblems
//* Within each call, we do an O(4) loop, but this always takes the same amount of time

//* Space: O(m * n) - There are m * n * maxMove unique subproblems
//* We are using bitwise alternation to eliminate the "move" state
//* Alternate between two rows in memory
//* The only other space is used by the directions array, but that uses O(4) space
