//* At each step, we either include the current coin or exclude it
//*     - We need to consider UNIQUE combinations
//!     - Different permutations do not contribute to our total
//* If we include the current coin
//*     - Don't move to the next coin; we can reuse the same coin
//* If we exclude the current coin
//*     - We SHOULD move to the next coin, but that means we can't use it again
//* This question is an unbounded knapsack
//*     - At each step, we either include or exclude the current element
//*     - We have INFINITE uses of the same element (with replacement)
//* The rule of SUM applies since we want the total number of ways

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, t)
function coinChangeII(amount, coins) {
  if (amount <= 0 || coins.length === 0) return 0;

  const n = coins.length;

  //* dp[i][amount] = The number of distinct ways we can make "amount" using the first "i" elements
  const dp = new Array(n + 1).fill(0).map(() => new Array(amount + 1).fill(0));

  //* It is always possible to make an amount of 0 (using 0 elements)
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let t = 0; t <= amount; t++) {
      //* Case 1: Exclude the current element
      dp[i][t] = dp[i - 1][t];

      //* Case 2: Include the current element
      if (t >= coins[i - 1]) {
        dp[i][t] += dp[i][t - coins[i - 1]];
      }
    }
  }

  return dp[n][amount];
}

console.log(coinChangeII(5, [1, 2, 5])); //* 4
console.log(coinChangeII(3, [2])); //* 0
console.log(coinChangeII(10, [1, 5, 10])); //* 4
console.log(coinChangeII(4, [1, 2, 3])); //* 4

//* Time: O(n * t) - We are caching the results of each subproblem
//* There are "n" possible values for "i" and "t" possible values for amount
//* Using the rule of product, there are n * t unique states

//* Space: O(n * t) - There are n * t unique states, thus our array is sized n x amount
