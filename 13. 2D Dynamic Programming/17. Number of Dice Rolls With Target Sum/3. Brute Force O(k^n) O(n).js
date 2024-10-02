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
function numRollsToTarget(n, k, target) {
  function countWays(n, target) {
    if (n === 0) {
      //* If target is 0, we found a valid combination
      return target === 0 ? 1 : 0;
    }

    let ways = 0;

    //* Roll from 1 to k (inclusive) at each level
    for (let i = 1; i <= k; i++) {
      //* Pruning to avoid redundant paths
      if (target - i >= 0) {
        ways = (ways + countWays(n - 1, target - i)) % MOD;
      }
    }

    return ways;
  }

  const MOD = 10 ** 9 + 7;
  return countWays(n, target);
}

console.log(numRollsToTarget(1, 6, 3)); //* 1
console.log(numRollsToTarget(2, 6, 7)); //* 6
console.log(numRollsToTarget(30, 30, 500)); //* 222616187

//* Time: O(k^n) - There are "k" branches from each call in the worst case
//* The height of the recursion tree scales with "n" (number of rolls)

//* Space: O(n) - The height of the recursion tree scales with the number of rolls (n)
