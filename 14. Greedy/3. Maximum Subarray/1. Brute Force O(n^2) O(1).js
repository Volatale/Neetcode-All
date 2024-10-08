//* Generate every possible subarray and calculate its sum
//* Track the MAXIMUM sum of all subarrays
function maxSubArray(nums) {
  if (nums.length === 1) return nums[0];

  let globalMax = 0;

  //* Calculate the sums of every subarray and track the max
  for (let i = 0; i < nums.length; i++) {
    let currSum = 0;

    //* Subarrays can be of size 1, so start at "i"
    for (let j = i; j < nums.length; j++) {
      currSum += nums[j];
      globalMax = Math.max(globalMax, currSum);
    }
  }

  return globalMax;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); //* 6
console.log(maxSubArray([1])); //* 1
console.log(maxSubArray([12, 3, 5])); //* 20
console.log(maxSubArray([-50])); //* -50
console.log(maxSubArray([5, 4, -1, 7, 8])); //* 23

//* Time: O(n^2) - It takes O(n^2) to generate every possible subarray

//* Space: O(1) - We are only using a constant amount of space
//* We use two variables are most, and neither scales with the input size
