//* Sum the number of ways at each level of recursion
//* Prune paths by ensuring we don't go out of bounds
//* Try every possible path to get every distinct way

//! Recurrence Relation: F(i,t) = sum(F(i+1,n-c) for all coins)
//* Apply tabulation to avoid recursion overhead
//* We only need to store the number of ways at each target
//*     - So we no longer need to store the index (number) in state
function combinationSum4(nums, target) {
  if (nums.length === 0 || target === 0) return 0;

  //* dp[t] = Number of ways we can make "t" using first "i" numbers
  const dp = new Array(target + 1).fill(0);

  //* There is always a way to make a target of 0 by using 0 elements
  dp[0] = 1;

  //* For each target, sum the total ways
  for (let t = 1; t <= target; t++) {
    for (let num of nums) {
      if (t >= num) {
        dp[t] += dp[t - num];
      }
    }
  }

  return dp[target];
}

console.log(combinationSum4([1], 1)); //* 1
console.log(combinationSum4([1, 2, 3], 4)); //* 7
console.log(combinationSum4([9], 3)); //* 0
console.log(combinationSum4([4, 2, 1, 5], 6)); //* 20

//* Time: O(n * t) - Where "n" is the length of the nums array
//* And "t" is the targete value
//* There are (n + 1) * (t + 1) unique subproblems to solve/memoize

//* Space: O(n) - The dp array scales with target
//* We aren't storing the index so it is a 1D input array
