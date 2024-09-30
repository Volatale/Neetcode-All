//* Subsequences are just subsets while retaining the relative order
//*     - So at each step, we either include or exclude the current element
//* Since we need to alternate between adding and subtracting
//!     - Use a boolean to track the two different states
//*     - Take the maximum of both paths

//* Apply caching to avoid redundant work
//*     - We have 2D state (i, plus)
//*     - There are only two possible values for plus
//*         - So just use two separate DP arrays
function maxAlternatingSum(nums) {
  if (nums.length === 0) return 0;

  const n = nums.length;

  const plus = new Array(n + 1).fill(0);
  const subtract = new Array(n + 1).fill(0);

  //* Base Case: Take the positive and negative of the first element
  plus[0] = nums[0];
  subtract[0] = -nums[0];

  for (let i = 1; i <= n; i++) {
    //* Retain the previous max or add the current element
    plus[i] = Math.max(plus[i - 1], nums[i - 1] + subtract[i - 1]);

    //* Retain the previous max or subtract the current element
    subtract[i] = Math.max(subtract[i - 1], -nums[i - 1] + plus[i - 1]);
  }

  return plus[n];
}

console.log(maxAlternatingSum([4, 2, 5, 3])); //* 7
console.log(maxAlternatingSum([5, 6, 7, 8])); //* 8
console.log(maxAlternatingSum([6, 2, 1, 2, 4, 5])); //* 10
console.log(maxAlternatingSum([5])); //* 5
console.log(maxAlternatingSum([5, 10])); //* 10
console.log(maxAlternatingSum([10, 5, 4])); //* 10

//* Time: O(n) - We are caching the result of each subproblem
//* We iterate through the entire array, which takes O(n)
//* It also takes O(n) to create each array

//* Space: O(n) - We have two DP arrays that both scale with "n"
//* There are only two possibilities for "plus"
