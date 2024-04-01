function maximumSubarray(nums) {
  if (nums.length === 1) return nums[0];

  let currSum = 0;
  let maxSum = 0;

  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    if (currSum < 0) currSum = 0;
    maxSum = Math.max(currSum, maxSum);
  }

  return maxSum;
}

console.log(maximumSubarray([5, 4, 1, -5, 3, 2, 6, 4])); //* Whole array added is 20
console.log(maximumSubarray([-5, 2, 4, 2, -10])); //* [2, 4, 2] = 8
console.log(maximumSubarray([1, -3, 2, 1, -1])); //* [2, 1] = 3
console.log(maximumSubarray([-2, 3, 2, -1])); //* [3, 2] = 5
console.log(maximumSubarray([-2])); //* [-2] = -2

//* Time: O(n) - The time taken to iterate over the array scales with the size of the input

//* Space: O(1) - We only ever use constant space variables, so the space usage remains constant
