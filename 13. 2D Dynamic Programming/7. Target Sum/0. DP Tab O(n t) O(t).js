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

//* Apply tabulation to avoid redundant work
//*     - We have 2D state (i, sum)
//!         - But we can't have negative indices
//*     - Instead, we should use a hashtable/hashmap
//*         - Then, we can just use a default value of || 0 if we go out of bounds
function findTargetSumWays(nums, target) {
  const n = nums.length;

  //* dp[target] = The number of ways to form each possible sum at the ith step
  //* Base Case: It is always possible to make 0 (by doing nothing)
  let dp = { 0: 1 };

  //* Handle both the positive and negative keys in the same loop
  for (let i = 0; i < n; i++) {
    const nextDp = {};

    //* Get all of the keys in the hashtable
    for (let sum in dp) {
      sum = parseInt(sum);

      //* Calculate new states by adding and subtracting nums[i]
      const add = sum + nums[i];
      const subtract = sum - nums[i];

      //* Transition the state: current state + previous state (sum is previous)
      nextDp[add] = (nextDp[add] || 0) + dp[sum];
      nextDp[subtract] = (nextDp[subtract] || 0) + dp[sum];
    }

    dp = nextDp;
  }

  return dp[target] || 0;
}

console.log(findTargetSumWays([1, 1, 1, 1, 1], 3)); //* 5
console.log(findTargetSumWays([1, 1, 1], 3)); //* 1
console.log(findTargetSumWays([5], 10)); //* 0
console.log(findTargetSumWays([1, 1, 1, 2], 5)); //* 1
console.log(findTargetSumWays([1], 1)); //* 1

//* Time: O(n * t) - We are caching the results of each subproblem
//* There are "n" different possibilities for "i"
//* And there are "t * 2" different values for target -target to target

//* Space: O(t) - We aren't using a 2D array here, we have eliminated the "i" state altogether
//* Instead, the number of keys now scales directly based on the number of target states
//* Target ranges from -target to + target (+1 for 0)
