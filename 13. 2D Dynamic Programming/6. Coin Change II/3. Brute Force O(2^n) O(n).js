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
function coinChangeII(amount, coins) {
  function findCombinations(i, target) {
    if (target === 0) return 1; //* Found a valid way
    if (target < 0 || i === coins.length) return 0; //* Invalid way or out of bounds

    return (
      findCombinations(i, target - coins[i]) + //* Include coin
      findCombinations(i + 1, target) //* Exclude coin
    );
  }

  return findCombinations(0, amount);
}

console.log(coinChangeII(5, [1, 2, 5])); //* 4
console.log(coinChangeII(3, [2])); //* 0
console.log(coinChangeII(10, [1, 5, 10])); //* 4
console.log(coinChangeII(4, [1, 2, 3])); //* 4

//* Time: O(2^n) - At each step, we have two choices: include or exclude the current coin
//* The depth of the recursion tree scales wtih the number of coins
//* In the worst case, we don't include ANY coins, so the "target" base case doesn't matter

//* Space: O(n) - The depth of the recursion tree scales wtih "n"
