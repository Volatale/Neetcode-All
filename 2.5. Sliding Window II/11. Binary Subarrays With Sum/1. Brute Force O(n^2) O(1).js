//* Try every subarray possible
//* Track the cumulative sum of the current subarray
//* If the sum is ever > goal, break out of the loop
function numSubarraysWithSum(nums, goal) {
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    //* Cumulative sum of current subarray
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      //* Add element to the current subarray
      sum += nums[j];

      //* Subarray is invalid
      if (sum === goal) {
        subarrays++;
      } else if (sum > goal) {
        //* Sum will never decrease, so the subarray ends here
        break;
      }
    }
  }

  return subarrays;
}

console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2)); //* 4
console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0)); //* 15
console.log(numSubarraysWithSum([1, 1, 0, 1], 2)); //* 3

//* Time: O(n^2) - We have nested for loops, both of which scale with the input size

//* Space: O(1) - The memory usage remains constant regardless of input size
