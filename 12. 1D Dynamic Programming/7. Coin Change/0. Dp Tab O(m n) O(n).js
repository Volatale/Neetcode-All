//* In a brute force manner, try every possible combination
//* We aren't using memoization here so we do a lot of repeat work
//* Prune the redundant branches that will lead to failure
//!     - If amount = 5 and coin[i] = 8, why bother enduring the recursion overhead?

//* Apply Tabulation to avoid recursion overhead
//* Objective Function = F(n) = Min No. of Coins needed to make amount "n"
//! Recurrence Relation: F(n) = min(F(n - c)) for all coins, as long as n - c >= 0
function coinChange(coins, amount) {
  //* It takes 0 coins to make an amount of 0
  if (amount === 0) return 0;

  //* dp[i] = Minimum Number of Coins needed to make amount "i"
  const dp = new Array(amount + 1).fill(Infinity);

  //* Takes 0 coins to make an an amount of 0
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0 && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  //* Minimum number of coins needed to make amount
  return dp[amount] < Infinity ? dp[amount] : -1;
}

console.log(coinChange([1], 3)); //* 3
console.log(coinChange([1, 2, 5], 11)); //* 3
console.log(coinChange([10], 20)); //* 2
console.log(coinChange([5], 21)); //* -1
console.log(coinChange([5, 2, 1], 11)); //* 3
console.log(coinChange([1, 2, 5], 1000)); //* 200

//* Time: O(n) - We memoize the results of F(n), where "n" = amount
//* We are doing 1D Dynamic Programming, so we don't need to cache any other state
//* There is only 1 non-constant argument, thus there are only "n" subproblems

//* Space: O(n) - There are "n" subproblems to cache, so there are "n" keys
//* The depth of the recursion tree scales with "n"
