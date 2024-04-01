//* Find the maximum subarray starting at every index
//* Try adding the current element to the sum so far
//* Then see if THAT is larger than what we have for globalMax
function maximumSubarray(nums) {
  if (nums.length === 1) return nums[0];

  let globalMax = 0;

  //* Calculate the maximum subarray sum starting at each index
  for (let i = 0; i < nums.length; i++) {
    let currMax = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      currMax += nums[j];
      globalMax = Math.max(currMax, globalMax);
    }
  }

  return globalMax;
}

console.log(maximumSubarray([5, 4, 1, -5, 3, 2, 6, 4])); //* Whole array added is 20
console.log(maximumSubarray([-5, 2, 4, 2, -10])); //* [2, 4, 2] = 8
console.log(maximumSubarray([1, -3, 2, 1, -1])); //* [2, 1] = 3
console.log(maximumSubarray([-2, 3, 2, -1])); //* [3, 2] = 5
console.log(maximumSubarray([-2])); //* [-2] = -2

//* Time: O(n^2) - It takes n * (n - 1) * 2 iterations to complete the function
//* We have two nested for loops that both scale with nums.length

//* Space: O(1) - We only use constant space variables
