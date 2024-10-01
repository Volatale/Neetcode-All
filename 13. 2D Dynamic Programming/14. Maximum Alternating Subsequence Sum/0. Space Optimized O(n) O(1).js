//* Subsequences are just subsets while retaining the relative order
//*     - So at each step, we either include or exclude the current element
//* Since we need to alternate between adding and subtracting
//!     - Use a boolean to track the two different states
//*     - Take the maximum of both paths

//* In our case, we only rely on the previous value
//*     - So we don't even need to keep the other values in memory
//*     - Space optimize by replacing the two arrays with two constant variables
function maxAlternatingSum(nums) {
  if (nums.length === 0) return 0;

  //* "plus" only has two possible states
  let plus = nums[0];
  let subtract = -nums[0];

  for (let i = 1; i <= nums.length; i++) {
    //* Keep the current subsequence or add the current element
    plus = Math.max(plus, nums[i - 1] + subtract);

    //* Keep the current subsequence or subtract the current element
    subtract = Math.max(subtract, -nums[i - 1] + plus);
  }

  return plus;
}

console.log(maxAlternatingSum([4, 2, 5, 3])); //* 7
console.log(maxAlternatingSum([5, 6, 7, 8])); //* 8
console.log(maxAlternatingSum([6, 2, 1, 2, 4, 5])); //* 10
console.log(maxAlternatingSum([5])); //* 5
console.log(maxAlternatingSum([5, 10])); //* 10
console.log(maxAlternatingSum([10, 5, 4])); //* 10

//* Time: O(n) - We iterate through the array once, which takes O(n)

//* Space: O(1) - We are only using constant space variables
