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

//* Apply memoization to avoid redundant work
//*     - We have 2D state (i, target)
function coinChangeII(amount, coins) {
  function findCombinations(i, target, memo) {
    if (target === 0) return 1; //* Found a valid way
    if (target < 0 || i === coins.length) return 0; //* Invalid way or out of bounds

    //* Utilize memoized value
    const key = `${i}-${target}`;
    if (memo.hasOwnProperty(key)) return memo[key];

    return (memo[key] =
      findCombinations(i, target - coins[i], memo) + //* Include coin
      findCombinations(i + 1, target, memo)); //* Exclude coin
  }

  return findCombinations(0, amount, {});
}

console.log(coinChangeII(5, [1, 2, 5])); //* 4
console.log(coinChangeII(3, [2])); //* 0
console.log(coinChangeII(10, [1, 5, 10])); //* 4
console.log(coinChangeII(4, [1, 2, 3])); //* 4

//* Time: O(n * t) - We are memoizing the results of each subproblem
//* There are "n" possible values for "i" and "t" possible values for amount
//* Using the rule of product, there are n * t unique states

//* Space: O(n * t) - Since there are n * t unique states, that means n * t unique keys/values
//* The depth of the recursion tree scales with "n"
