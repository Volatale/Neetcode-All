//* We can make "maxMove" moves
//* Use DFS or BFs to travel between cells
//* If we go out of bounds, we found a valid way
//* Our "main" base case is if we have 0 moves left
//*     - Then return 0, this does not count as a valid path
//*     - By doing this check after the out of bounds check
//*         - We ensure that we know there can be no more possible moves
//*     - Every call, decrement moves by 1
function findPaths(m, n, maxMove, startRow, startColumn) {
  function countWays(row, col, moves) {
    //* Base Case: Found a way out of bounds
    if (row < 0 || col < 0 || row === m || col === n) return 1;

    //* Base Case: No more moves left, or already visited
    if (moves === 0) return 0;

    let ways = 0;

    //* Try every possible move from this cell
    for (const [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      ways = (ways + countWays(newRow, newCol, moves - 1)) % MOD;
    }

    return ways;
  }

  const MOD = 10 ** 9 + 7;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  return countWays(startRow, startColumn, maxMove);
}

console.log(findPaths(2, 2, 2, 0, 0)); //* 6
console.log(findPaths(1, 3, 3, 0, 1)); //* 12
console.log(findPaths(3, 3, 2, 1, 1)); //* 4
console.log(findPaths(1, 1, 1, 0, 0)); //* 4

//* Time: O(4^maxMove)) - Each call leads to 4 more calls
//* The depth of the recursion tree scales with the number of moves we can make

//* Space: O(maxMove) - The depth of the recursion tree scales with the number of mves we can make
//* The only other space is used by the directions array, but that uses O(4) space
