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
//* Apply tabulation to avoid recursion overhead
//*     - We only need to keep the previous and current row in memory at the same time
//! This is Pull DP, so we are saying we moved FROM "i" to "nextMove"
function knightDialer(n) {
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

  //* dp[move][digit] = No. of distinct phone numbers ending at digit after "move" moves
  let dp = new Array(10).fill(1);

  let totalWays = 0;

  //* Pull DP: Collect values FROM "i" (prev row) and pull them to "nextMove" (current row)
  for (let move = 1; move < n; move++) {
    const newRow = new Array(10).fill(0);

    for (let i = 0; i <= 9; i++) {
      for (let nextMove of validMoves[i]) {
        newRow[nextMove] = (newRow[nextMove] + dp[i]) % MOD;
      }
    }

    dp = newRow;
  }

  //* Sum the total ways (of the nth move)
  totalWays = dp.reduce((acc, curr) => (acc + curr) % MOD, 0);

  return totalWays;
}

console.log(knightDialer(1)); //* 10
console.log(knightDialer(2)); //* 20
console.log(knightDialer(54)); //* 70992133
console.log(knightDialer(39)); //* 290508779
console.log(knightDialer(3131)); //* 136006598

//* Time: O(n * 10) - There are 10 possible digits and "n" possile moves we can make
//* In the worst case, we can move from a cell to three other cells (but this is constant)
//* Therefore the time complexity is n * 10

//* Space: O(10) - We create an 2 x 10 matrix to store the results of subproblems
//* We only keep the previous and current row in memory at the same time
