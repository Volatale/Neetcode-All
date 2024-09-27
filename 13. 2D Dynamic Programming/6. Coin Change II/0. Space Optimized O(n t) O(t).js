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
//*     - In this version, we optimized the space
//*     - When the rule of sum applies (when we need to sum the total number of ways)
//*         - We can use 1D array and disregard the state of "i"
//*         - All we have to do is accumulate values into each index and return the last
function coinChangeII(amount, coins) {
  //* dp[i][amount] = The number of distinct ways we can make "amount" using the first "i" elements
  const dp = new Array(amount + 1).fill(0);

  //* It is always possible to make an amount of 0 (using 0 elements)
  dp[0] = 1;

  for (const coin of coins) {
    for (let t = coin; t <= amount; t++) {
      //* Ensure we stay within the array bounds
      if (t >= coin) {
        dp[t] += dp[t - coin];
      }
    }
  }

  return dp[amount];
}

console.log(coinChangeII(5, [1, 2, 5])); //* 4
console.log(coinChangeII(3, [2])); //* 0
console.log(coinChangeII(10, [1, 5, 10])); //* 4
console.log(coinChangeII(4, [1, 2, 3])); //* 4

//* Time: O(n * t) - We are caching the results of each subproblem
//* There are "n" possible values for "i" and "t" possible values for amount
//* Using the rule of product, there are n * t unique states

//* Space: O(t) - The DP array is an array of length "t", (a 1D array)
