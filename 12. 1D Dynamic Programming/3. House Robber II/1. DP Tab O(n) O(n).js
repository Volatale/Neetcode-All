//* We either decide to rob the first or leave it
//* If we do, we cannot rob the final (nums[0]) house

//! Recurrence Relation: F(n) = max(F(n-2) + nums[n],F(n-1)
//! Return 0 if i < 0
//! Return nums[0] if i = 0 AND !robbedFirst, else 0
function rob(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  const n = nums.length;

  //* i represents whether or not we robbed the first house (0 = robbed, 1 = not robbed)
  //* dp[i][j] = Total maximum profit we can get by starting at house 0 or 1
  const dp = new Array(2).fill(0).map(() => new Array(n + 1).fill(0));

  //* Base Cases: Rob the first house, skip last
  dp[0][0] = nums[0];
  dp[0][1] = Math.max(nums[0], nums[1]);

  //* Base Case: Skip the first house, rob last
  dp[1][1] = nums[1];
  dp[1][2] = Math.max(nums[1], nums[2]);

  //* Case 1, rob first, skip last
  for (let i = 2; i < n - 1; i++) {
    dp[0][i] = Math.max(dp[0][i - 1], dp[0][i - 2] + nums[i]);
  }

  //* Case 2, Skip first, rob last
  for (let i = 2; i < n; i++) {
    dp[1][i] = Math.max(dp[1][i - 1], dp[1][i - 2] + nums[i]);
  }

  //* Return the max from both scenarios
  return Math.max(dp[0][n - 2], dp[1][n - 1]);
}

console.log(rob([2, 3, 2])); //* 3
console.log(rob([1, 2, 3, 1])); //* 4
console.log(rob([1, 2, 3])); //* 3

//* Time: O(n) - We need to perform two loops in total
//* The first handles the case where we DO rob the first house
//* The second handles the case where we DIDN'T rob the first house

//* Space: O(n) - There are 2 * n possible subproblems
//* But since we always create two arrays, the 2 is constant
