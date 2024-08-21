//* In a brute force manner, try every possible combination
//* We aren't using memoization here so we do a lot of repeat work
//* Prune the redundant branches that will lead to failure
//!     - If amount = 5 and coin[i] = 8, why bother enduring the recursion overhead?

//* Objective Function = F(n) = Min No. of Coins needed to make amount "n"
//! Recurrence Relation: F(n) = min(F(n - c)) for all coins, as long as n - c >= 0
function coinChange(coins, amount) {
  function change(amount) {
    if (amount === 0) return 0; //* Made up the change

    //* Be pessimistic
    let fewestCoins = Infinity;

    for (let i = 0; i < coins.length; i++) {
      //* Pruning branches
      if (amount - coins[i] < 0) continue;

      //* Every subsequent call results in an additional coin
      fewestCoins = Math.min(fewestCoins, change(amount - coins[i]) + 1);
    }

    return fewestCoins;
  }

  const fewestCoins = change(amount);
  return fewestCoins < Infinity ? fewestCoins : -1;
}

console.log(coinChange([1, 2, 5], 11)); //* 3
console.log(coinChange([10], 20)); //* 2
console.log(coinChange([5], 21)); //* -1
console.log(coinChange([5, 2, 1], 11)); //* 3

//* Time: O(m^n) - Where "m" is coins.length and "n" is amount
//* There are "m" aditional calls made (in the worst case) at each level of recursion
//* The depth of the recursion tree scales with "n" because in the worst case we reduce "n" by 1

//* Space: O(n) - The depth of the recursion tree scales with "amount" (n)
//* At each level of recursion we can reduce "n" by 1 (at minimum)
