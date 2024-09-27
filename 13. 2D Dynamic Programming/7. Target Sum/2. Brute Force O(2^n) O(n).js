//* We need to either append a "+" or a "-" before each element in nums
//*     - In other words, we have TWO choices at each step
//* There is no way to tell what the optimal choices is
//*     - A locally optimal choice may not lead us to the correct (global) result
//* We don't have to actually track strings or concatenate anything
//*     - Just try ADDING and SUBTRACTING each number at every level of recursion
//* This is a essentially a 0/1 knapsack
//*     - We can't reuse the same element again (so we pass i + 1)
//*     - The "max weight" in our case is target
//*         - If sum < target or sum > target, we did NOT find a valid way
//*         - Only count paths where SUM is EXACTLY equal to target
//! "How many ways can we reach target by subtracting nums[i] or adding nums[i] at each step?"
function findTargetSumWays(nums, target) {
  function countWays(i, sum) {
    if (i === nums.length) {
      //* If the sum is equal to target, we found a valid way
      return sum === target ? 1 : 0;
    }
    //* Sum the ways from ADDING and SUBTRACTING nums[i]
    return countWays(i + 1, sum + nums[i]) + countWays(i + 1, sum - nums[i]);
  }

  return countWays(0, 0);
}

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3)); //* 5
console.log(findTargetSumWays([1, 1, 1], 3)); //* 1
console.log(findTargetSumWays([5], 10)); //* 0
console.log(findTargetSumWays([1, 1, 1, 2], 5)); //* 1
console.log(findTargetSumWays([1], 1)); //* 1

//* Time: O(2^n) - At each step, we either ADD or SUBTRACT the current number
//* We can't reuse the same element, and each combination must be distinct
//* Branching Factor = 2, height of recursion tree = n

//* Space: O(n) - The height of the recursion tree scales with the number of elements (n)
