//* Use Kadane's Algorithm
//*     - Kadane's Algorithm is a space optimized DP algorithm
//* For every element
//*     Either ADD nums[i] to the current subarray, or,
//*         - Add to current subarray if current subarray + nums[i] > nums[i] alone
//*     Start a brand new subarray (with just nums[i])
//*         - We start a new subarray if nums[i] alone > current subarray + nums[i]
//* We track the sum of the current subarray and the global maximum sum
function maxSubArray(nums) {
  if (nums.length === 1) return nums[0];

  let currMax = nums[0];
  let globalMax = nums[0];

  //* For each element either ADD it to the current subarray, or start a NEW subarray
  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(currMax + nums[i], nums[i]);
    globalMax = Math.max(globalMax, currMax);
  }

  return globalMax;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); //* 6
console.log(maxSubArray([1])); //* 1
console.log(maxSubArray([12, 3, 5])); //* 20
console.log(maxSubArray([-50])); //* -50
console.log(maxSubArray([5, 4, -1, 7, 8])); //* 23

//* Time: O(n) - We iterate through the array once, so the time taken scales with the input size (n)

//* Space: O(1) - We are only using a constant amount of space
//* We use two variables are most, and neither scales with the input size
