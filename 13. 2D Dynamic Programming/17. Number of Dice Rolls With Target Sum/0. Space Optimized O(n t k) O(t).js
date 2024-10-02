//* Similar to coin change
//*     - We are allowed to reuse the same element multiple times
//*     - Essentially a combinations problem
//* "n" tells us how many rolls to make
//* "k" tells us how many faces each die has
//*     - We try all "k" faces in each call
//* If n === 0 and target === 0, we found a valid path
//!     - If n !== 0 and target === 0, this is not yet a valid path
//*     - We inevitably have more rolls to make
//*         - Thus, the our "sum" will be > target (or < target in our case)

//* Apply memoization to avoid redundant work
//*     - We eliminated the 2D state altogether
//*     - Now, the DP array scales solely based on the target
//*         - We create a temporary array to hold the "new" row's state
function numRollsToTarget(n, k, target) {
  if (target === 0) return 1;

  //* dp[n][t] = Number of ways we can reach target "t" using "n" rolls
  let dp = new Array(target + 1).fill(0);

  const MOD = 10 ** 9 + 7;

  //* It is always possible to make a target of 0 (using 0 rolls)
  dp[0] = 1;

  for (let roll = 1; roll <= n; roll++) {
    //* newRow holds the results of the current row's subproblems
    const newRow = new Array(target + 1).fill(0);

    for (let face = 1; face <= k; face++) {
      for (let t = face; t <= target; t++) {
        //* Sum the number of ways with the previous state (roll-1, t - face)
        newRow[t] = (newRow[t] + dp[t - face]) % MOD;
      }
    }

    dp = newRow;
  }

  return dp[target];
}

console.log(numRollsToTarget(1, 6, 3)); //* 1
console.log(numRollsToTarget(2, 6, 7)); //* 6
console.log(numRollsToTarget(30, 30, 500)); //* 222616187

//* Time: O(n * t * k) - We are caching the results of each subproblem
//* There are "n" possible values for "n" and "t" possible values for target
//* So the rule of product gives us n * t unique subproblems
//* To roll the dice, we have to do an O(k) loop -> O(n * t * k)

//* Space: O(t) - The DP array scales solely based on the target itself
//* Technically we have 2 rows in memory simultaneously, but O(2 * t) = O(t)
