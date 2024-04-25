//* Check every subarray for the sum
//* Start from 0 at the start of each subarray
//* If sum === goal, we found a subarray
//* If sum > goal, the sum is too large, so just break
function binarySubarraysWithSum(nums, goal) {
  let subarrays = 0;

  //* Check every subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* We want to keep finding subarrays until sum > goal
      if (sum === goal) {
        subarrays++;
      } else if (sum > goal) break;
    }
  }

  return subarrays;
}

console.log(binarySubarraysWithSum([1, 0, 1, 0, 1], 2)); //*
console.log(binarySubarraysWithSum([0, 0, 0, 0, 0], 0)); //* 15
console.log(binarySubarraysWithSum([0, 0, 1], 0)); //* 3

//* Time: O(n^2) - We have two nested for loops, both of which depend on "n"

//* Space: O(1) - We don't use any space that scales with input size
