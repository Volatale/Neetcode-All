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
//*     - We have 2D state (n, target)
//*     - There is no need to cache the "k" state
//*         - That is inherently handled by the call stack itself
function numRollsToTarget(n, k, target) {
  function countWays(n, target, memo) {
    if (n === 0) {
      //* If target is 0, we found a valid combination
      return target === 0 ? 1 : 0;
    }

    //* Utilize memoized value
    const key = `${n}-${target}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    let ways = 0;

    //* Roll from 1 to k (inclusive) at each level
    for (let i = 1; i <= k; i++) {
      //* Pruning to avoid redundant paths
      if (target - i >= 0) {
        ways = (ways + countWays(n - 1, target - i, memo)) % MOD;
      }
    }

    return (memo[key] = ways);
  }

  const MOD = 10 ** 9 + 7;
  return countWays(n, target, {});
}

console.log(numRollsToTarget(1, 6, 3)); //* 1
console.log(numRollsToTarget(2, 6, 7)); //* 6
console.log(numRollsToTarget(30, 30, 500)); //* 222616187

//* Time: O(n * t * k) - We are memoizing the results of each subproblem
//* There are "n" possible values for "n" and "t" possible values for target
//* So the rule of product gives us n * t unique subproblems
//* Within each call, we have to do an O(k) loop -> O(n * t * k)

//* Space: O(n * t) - There are n * t unique subproblems, thus n * t unique keys/values
//* The height of the recursion tree scales with the number of rolls (n)
