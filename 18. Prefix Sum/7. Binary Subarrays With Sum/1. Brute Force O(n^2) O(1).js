//* Check every possible subarray
//* If the subarray sum is equal to goal
//*     - We found a valid subarray
//* If sum is GREATER than goal, we should stop expanding this subarray
//*     - Expanding the subarray any more does not get us closer to the goal
//*     - The only elements we can have are 0 or 1, so either we stay at a sum of "n" or we get further away from goal
function numSubarraysWithSum(nums, goal) {
  //* There are no non-empty subarrays
  if (nums.length === 0) return 0;

  let subarrays = 0;

  //* Try every possible subarray
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      //* Found a valid subarray
      if (sum === goal) {
        subarrays++;
      } else if (sum > goal) {
        //* Adding any more elements does not put us closer to the goal
        break;
      }
    }
  }

  return subarrays;
}

console.log(numSubarraysWithSum([1, 0, 1, 0, 1], 2)); //* 4
console.log(numSubarraysWithSum([0, 0, 0], 0)); //* 6
console.log(numSubarraysWithSum([0, 0, 0, 0, 0], 0)); //* 15
console.log(numSubarraysWithSum([1, 1, 1], 1)); //* 3

//* Time: O(n^2) - We have a nested for loop, and both loops scale with the input size

//* Space: O(1) - We are not using any additonal space that will scale with the input size
