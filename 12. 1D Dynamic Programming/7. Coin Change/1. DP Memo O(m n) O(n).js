//* In a brute force manner, try every possible combination
//* We aren't using memoization here so we do a lot of repeat work
//* Prune the redundant branches that will lead to failure
//!     - If amount = 5 and coin[i] = 8, why bother enduring the recursion overhead?

//* Apply Memoization to avoid redundant work
//* Objective Function = F(n) = Min No. of Coins needed to make amount "n"
//! Recurrence Relation: F(n) = min(F(n - c)) for all coins, as long as n - c >= 0
function coinChange(coins, amount) {
  function change(amount, memo) {
    if (amount === 0) return 0; //* Made up the change

    //* Utilize memoized result
    if (memo.hasOwnProperty(amount)) return memo[amount];

    //* Be pessimistic
    let fewestCoins = Infinity;

    for (let i = 0; i < coins.length; i++) {
      //* Pruning branches
      if (amount - coins[i] < 0) continue;

      //* Every subsequent call results in an additional coin
      fewestCoins = Math.min(fewestCoins, change(amount - coins[i], memo) + 1);
    }

    memo[amount] = fewestCoins;
    return fewestCoins;
  }

  const memo = {};
  return change(amount, memo) < Infinity ? memo[amount] : -1;
}

console.log(coinChange([1, 2, 5], 11)); //* 3
console.log(coinChange([10], 20)); //* 2
console.log(coinChange([5], 21)); //* -1
console.log(coinChange([5, 2, 1], 11)); //* 3
console.log(coinChange([1, 2, 5], 1000)); //* 200

//* Time: O(n*m)) - We memoize the results of F(n), where "n" = amount
//* We are doing 1D Dynamic Programming, so we don't need to cache any other state
//* There is only 1 non-constant argument, thus there are only "n" subproblems
//* We have an O(m) loop where "m" is coins.length

//* Space: O(n) - There are "n" subproblems to cache, so there are "n" keys
//* The depth of the recursion tree scales with "n"
