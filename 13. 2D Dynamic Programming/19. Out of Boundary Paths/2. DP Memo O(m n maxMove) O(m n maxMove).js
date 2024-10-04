//* We can make "maxMove" moves
//* Use DFS or BFs to travel between cells
//* If we go out of bounds, we found a valid way
//* Our "main" base case is if we have 0 moves left
//*     - Then return 0, this does not count as a valid path
//*     - By doing this check after the out of bounds check
//*         - We ensure that we know there can be no more possible moves
//*     - Every call, decrement moves by 1

//* Apply memoization to avoid redundant work
//*     - We have 3D state (row, col, moves)
function findPaths(m, n, maxMove, startRow, startColumn) {
  function countWays(row, col, moves, memo) {
    //* Base Case: Found a way out of bounds
    if (row < 0 || col < 0 || row === m || col === n) return 1;

    //* Base Case: No more moves left, or already visited
    if (moves === 0) return 0;

    //* Utilize memoized value
    const key = `${row}-${col}-${moves}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let ways = 0;

    //* Try every possible move from this cell
    for (const [r, c] of directions) {
      const newRow = row + r;
      const newCol = col + c;

      ways = (ways + countWays(newRow, newCol, moves - 1, memo)) % MOD;
    }

    return (memo[key] = ways);
  }

  const MOD = 10 ** 9 + 7;

  const directions = [
    [-1, 0], //* Up
    [0, 1], //* Right
    [1, 0], //* Down
    [0, -1], //* Left
  ];

  return countWays(startRow, startColumn, maxMove, {});
}

console.log(findPaths(2, 2, 2, 0, 0)); //* 6
console.log(findPaths(1, 3, 3, 0, 1)); //* 12
console.log(findPaths(3, 3, 2, 1, 1)); //* 4
console.log(findPaths(1, 1, 1, 0, 0)); //* 4

//* Time: O(m * n * maxMove) - We are memoizing the results of each subproblem
//* There are "m" possible valus for row, "n" possible values for col and maxMove moves in total
//* The rule of product gives us m * n * maxMove unique subproblems
//* Within each call, we do an O(4) loop, but this always takes the same amount of time

//* Space: O(m * n * maxMove) - There are m * n * maxMove unique subproblems/keys
//* The depth of the recursion tree scales with the number of mves we can make
//* The only other space is used by the directions array, but that uses O(4) space
