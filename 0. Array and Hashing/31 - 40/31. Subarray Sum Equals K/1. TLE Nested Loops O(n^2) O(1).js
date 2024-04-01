//! Gives TLE!
//! Don't use on Leetcode!
function subarraySumEqualsK(nums, k) {
  let subarrays = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      if (sum === k) subarrays++;
    }
  }

  return subarrays;
}

console.log(subarraySumEqualsK([1, 1, 1], 2)); //* 2
console.log(subarraySumEqualsK([1, 2, 3], 6)); //* 1
console.log(subarraySumEqualsK([4, 2, 1], 4)); //* 1

//* Time: O(n^2) - We have two nested for loops that both depend on input length

//* Space: O(1) - We only use constant space; the space usage remains constant
