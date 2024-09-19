//* The robot can either move DOWN or move RIGHT
//*     - So we there are two possibilities at each step
//*     - Rule of Sum applies
//* We start at the top-left of the grid and we want to get to the bottom-right
//*     - In total, there are (m + n - 2) moves needed to get there
//*         - Since we START at a cell:
//*             - (m - 1) moves DOWN
//*             - (n - 1) moves RIGHT
//!     - (m - 1) + (n - 1) = m + n - 2

//* To get from the top-left to the bottom-right
//*     - We need to make EXACTLY m - 1 down moves and n - 1 right moves
//*     - The ORDER in which we make these moves matters
//* If ALL moves (down, right) were DISTINCT
//*     - The total number of ways to arrange them is (m + n - 2)!
//*     - We take the FACTORIAL of the number of moves

//* indistinguishability of Moves:
//*     - The "down" moves are all the same, as are all the "right" moves
//*         - Each move is an identical action
//*             - We can't distinguish between different INSTANCES of these actions
//*         - Imagine we had 3 down moves and 2 right moves
//*             - Both of these sequences are identical
//*                 - "DDRDR"
//*                 - "DRDDR"
//*         - It is still 3 down and 2 right regardless of order
//*     - Permuting identical moves does NOT create a new path
//*         - Divide by (m - 1)! for the down moves
//*         - Divide by (n - 1)! for the right moves

//! Doesn't work on leetcode, number is too large
function uniquePaths(m, n) {
  //* dp[i] = Result of i factorial
  const dp = new Array(m + n - 1).fill(1);

  //* Calculate the factorial numbers up to m + n - 2
  for (let i = 2; i <= m + n - 2; i++) {
    dp[i] = i * dp[i - 1];
  }

  //* Calculate the binomial coefficient (m + n - 2) / (m - 1)! * (n - 1)!
  return dp[m + n - 2] / (dp[m - 1] * dp[n - 1]);
}

console.log(uniquePaths(1, 1)); //* 1
console.log(uniquePaths(3, 2)); //* 3
console.log(uniquePaths(3, 7)); //* 28
console.log(uniquePaths(4, 4)); //* 16

//* Time: O(n + m) - It takes O(n + m) to generate all the factorials
//* Then we can fetch every factorial in O(1)

//* Space: O(n + m) - We need somewhere to store every factorial
//* So the space used by the DP array scales with n + m
