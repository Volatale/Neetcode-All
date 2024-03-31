//* Use Kadane's Algorithm, it is used to find the maximum subarray
//* For each index, we find the maximum subarray sum
//* Either take this element on its own, or add it to the previous
//* Update globalMax if the currMax > global
function maximumSubarray(nums) {
  //* Initialize both to the first number (a subarray can be 1 element long)
  let currMax = nums[0];
  let globalMax = nums[0];

  //* Max is either nums[i] (current element on its own), or
  //* nums[i] (current element) + previous max subarray
  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    globalMax = Math.max(globalMax, currMax);
  }

  return globalMax;
}

console.log(maximumSubarray([5, 4, 1, -5, 3, 2, 6, 4])); //* Whole array added is 20
console.log(maximumSubarray([-5, 2, 4, 2, -10])); //* [2, 4, 2] = 8
console.log(maximumSubarray([1, -3, 2, 1, -1])); //* [2, 1] = 3
console.log(maximumSubarray([-2, 3, 2, -1])); //* [3, 2] = 5
console.log(maximumSubarray([-2])); //* [-2] = -2

//* Time: O(n) - It takes O(n) time to iterate through the whole array
//* So time taken scales proportionally with the size of the input

//* Space: O(1) - We only ever use constant space variables
//* So the space usage does not scale with the input size
