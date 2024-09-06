//! Precompute the valid moves we can make from each cell to reduce the overall runtime
//*     - Otherwise we have to try every possible move in a BFS/DFS-like manner which takes awhile
//* Track the number of moves we have made thus far
//* We also need to track the CURRENT cell, so we know where we can move
//* The knight can START from any of the valid cells
//*     - So the outer loop handles this case for us
//*     - We say that we start with "1" move because we need to do n - 1 moves (in total)

//* "c" = Current cell
//* "m" = Total moves
//! Recurrence Relation: F(c, m) = sum(F(c_i, m + 1) for all n [0:9])
function knightDialer(n) {
  function moveKnight(cell, totalMoves) {
    //* Base Case: can't move any more
    if (totalMoves === n) return 1;

    let ways = 0;

    //* Explore every move from the current cell
    for (let nextMove of validMoves[cell]) {
      ways = (ways + moveKnight(nextMove, totalMoves + 1)) % MOD;
    }

    return ways;
  }

  const MOD = 10 ** 9 + 7;

  //* Precompute the number of valid moves we can make
  const validMoves = {
    0: [4, 6],
    1: [6, 8],
    2: [7, 9],
    3: [4, 8],
    4: [0, 3, 9],
    5: [],
    6: [0, 1, 7],
    7: [2, 6],
    8: [1, 3],
    9: [2, 4],
  };

  let totalWays = 0;

  //* The knight can start from any valid cell [0, 9]
  for (let i = 0; i <= 9; i++) {
    totalWays = (totalWays + moveKnight(i, 1)) % MOD;
  }

  return totalWays;
}

console.log(knightDialer(1)); //* 10
console.log(knightDialer(2)); //* 20
console.log(knightDialer(54)); //* 70992133
console.log(knightDialer(39)); //* 290508779
console.log(knightDialer(3131)); //* 136006598

//* Time: O(3^n) - In the worst case, there are three valid moves we can make at each cell
//* The recursion depth is bounded by "n", thus the branching factor is 3
//* and the height of the recursion tree is "n"

//* Space: O(n) - The depth of the recursion tree scales with "n" since that is the base case
