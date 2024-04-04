//! Gives TLE, don't run on Leetcode!
function continuousSubarray(nums, k) {
  if (nums.length <= 1) return false; //* Needs to be length 2 or greater

  for (let i = 0; i <= nums.length - 1; i++) {
    let sum = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      sum += nums[j];

      if (sum % k === 0) return true;
    }
  }

  return false;
}

console.log(continuousSubarray([3, 4, 5, 21], 5)); //* True
console.log(continuousSubarray([23, 2, 4, 6, 7], 6)); //* True
console.log(continuousSubarray([23, 2, 6, 4, 7], 6)); //* True
console.log(continuousSubarray([23, 2, 6, 4, 7], 13)); //* False

//* Time: O(n^2) - We have two nested for loops, with both scaling with the length of the input
//* O(n * (n-1) / 2), so triangle numbers

//* Space: O(1) - We only use constant space; the space complexity does not scale with the input size
