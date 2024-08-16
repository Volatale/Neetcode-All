//* At each level of recursion, we have two choices
//*     Either rob the current house or don't
//* If you DO rob the house
//*     - Get the profit from the current house (nums[n])
//*     - Decrement "n" by 2 since we can't rob an adjacent house
//* If we DON'T rob the house
//*     - We don't get the profit from the house
//*      - But we ARE allowed to rob an adjacent house

//! Recurrence Relation: F(n) = Math.max(F(n-2) + cost[n], F(n-1))
//* F(n) = Maximum profit possible to get at this house
function houseRobber(nums) {
  //* Take the max profit of both houses if only 2 exist
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  const n = nums.length;
  const dp = new Array(n).fill(0);

  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  //* If we rob the current house, we take the profit from the (i-2)th house
  //* Otherwise take the (i-1)th house
  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
  }

  //* The last index holds the overall maximum profit possible
  return dp[n - 1];
}

console.log(houseRobber([1, 2, 3, 1])); //* 4
console.log(houseRobber([2, 7, 9, 3, 1])); //* 12
console.log(houseRobber([4, 3, 7, 8, 1, 2])); //* 14
console.log(houseRobber([4, 5, 6])); //* 10

//* Time: O(n) - By applying tabulation (bottom-up) DP to our solution
//* We save time by only computing each subproblem once

//* Space: O(n) - We create an array of length "n" to hold the results of F(N)
